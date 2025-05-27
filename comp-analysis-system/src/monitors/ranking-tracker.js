import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';
import { dailyKeywords, weeklyKeywords } from '../config/keywords.js';
import { competitors } from '../config/competitors.js';
import { logRankingCheck, logError, logSystem } from '../utils/logger.js';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

export class RankingTracker {
  constructor() {
    this.browser = null;
    this.headless = process.env.HEADLESS_MODE === 'true';
    this.maxResults = 100; // Check top 100 results
    this.searchDelay = 15000; // 15 seconds between searches
  }

  async initialize() {
    try {
      this.browser = await chromium.launch({
        headless: this.headless,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-blink-features=AutomationControlled'
        ]
      });
      logSystem('Ranking tracker initialized');
      console.log(chalk.green('✓ Ranking tracker ready'));
    } catch (error) {
      logError(error, 'Failed to initialize browser for ranking tracker');
      throw error;
    }
  }

  async trackRankings(isWeekly = false) {
    console.log(chalk.bold.cyan('\n📊 Starting ranking tracker...\n'));
    
    const keywords = isWeekly ? [...dailyKeywords, ...weeklyKeywords] : dailyKeywords;
    const results = {
      timestamp: new Date().toISOString(),
      rankings: {},
      changes: []
    };

    for (const keyword of keywords) {
      console.log(chalk.blue(`\nChecking rankings for: "${keyword}"`));
      
      try {
        const rankings = await this.checkKeywordRankings(keyword);
        results.rankings[keyword] = rankings;
        
        // Compare with previous rankings
        const changes = await this.detectRankingChanges(keyword, rankings);
        if (changes.length > 0) {
          console.log(chalk.yellow(`⚠️  Ranking changes detected!`));
          results.changes.push(...changes);
        }
        
        // Log the results
        logRankingCheck(keyword, rankings);
        
        // Display top results
        this.displayRankings(rankings);
        
        // Delay between searches
        console.log(chalk.gray(`Waiting ${this.searchDelay/1000}s before next search...`));
        await this.delay(this.searchDelay);
        
      } catch (error) {
        console.log(chalk.red(`✗ Error checking "${keyword}": ${error.message}`));
        logError(error, `Ranking check for ${keyword}`);
        results.rankings[keyword] = { error: error.message };
      }
    }

    // Save results
    await this.saveRankingData(results);
    
    return results;
  }

  async checkKeywordRankings(keyword) {
    const page = await this.browser.newPage();
    const rankings = {
      keyword,
      checkedAt: new Date().toISOString(),
      positions: {},
      topCompetitors: []
    };

    try {
      // Set user agent and viewport
      await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      });
      await page.setViewportSize({ width: 1920, height: 1080 });

      // Navigate to Google
      await page.goto('https://www.google.com', { waitUntil: 'networkidle' });
      
      // Accept cookies if prompted
      try {
        await page.click('button:has-text("Accept all")', { timeout: 5000 });
      } catch (e) {
        // Cookie prompt may not appear
      }

      // Search for keyword
      await page.fill('textarea[name="q"], input[name="q"]', keyword);
      await page.keyboard.press('Enter');
      
      // Wait for results
      await page.waitForSelector('#search', { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Extract search results
      const searchResults = await page.evaluate(() => {
        const results = [];
        const organicResults = document.querySelectorAll('#search .g');
        
        organicResults.forEach((result, index) => {
          const linkElement = result.querySelector('a');
          const titleElement = result.querySelector('h3');
          
          if (linkElement && titleElement) {
            const url = linkElement.href;
            const title = titleElement.textContent;
            const domain = new URL(url).hostname.replace('www.', '');
            
            results.push({
              position: index + 1,
              url,
              domain,
              title
            });
          }
        });
        
        return results;
      });

      // Find WEO Media position
      const weoResult = searchResults.find(r => 
        r.domain.includes('weomedia.com') || 
        r.title.toLowerCase().includes('weo media')
      );
      
      if (weoResult) {
        rankings.positions['WEO Media'] = weoResult.position;
        console.log(chalk.green(`✓ WEO Media: Position ${weoResult.position}`));
      } else {
        rankings.positions['WEO Media'] = 'Not in top 100';
        console.log(chalk.red(`✗ WEO Media: Not in top 100`));
      }

      // Find competitor positions
      for (const competitor of competitors) {
        const competitorResult = searchResults.find(r => 
          r.domain.includes(competitor.domain)
        );
        
        if (competitorResult) {
          rankings.positions[competitor.name] = competitorResult.position;
          rankings.topCompetitors.push({
            name: competitor.name,
            position: competitorResult.position,
            url: competitorResult.url
          });
        }
      }

      // Sort top competitors by position
      rankings.topCompetitors.sort((a, b) => a.position - b.position);

      // Take screenshot of results
      const screenshotPath = await this.captureSearchResults(page, keyword);
      rankings.screenshot = screenshotPath;

    } catch (error) {
      throw error;
    } finally {
      await page.close();
    }

    return rankings;
  }

  async captureSearchResults(page, keyword) {
    const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const safeKeyword = keyword.replace(/\s+/g, '-').toLowerCase();
    const filename = `search_${safeKeyword}_${timestamp}.jpg`;
    const filepath = path.join(dataDir, 'screenshots', 'rankings', filename);

    await fs.mkdir(path.dirname(filepath), { recursive: true });

    await page.screenshot({
      path: filepath,
      fullPage: false,
      quality: 80,
      type: 'jpeg'
    });

    return filename;
  }

  async detectRankingChanges(keyword, currentRankings) {
    const changes = [];
    
    try {
      // Load previous rankings
      const historyPath = path.join(dataDir, 'rankings', 'history.json');
      const historyExists = await fs.access(historyPath).then(() => true).catch(() => false);
      
      if (!historyExists) {
        return changes;
      }

      const history = JSON.parse(await fs.readFile(historyPath, 'utf8'));
      const previousRankings = history[keyword];
      
      if (!previousRankings) {
        return changes;
      }

      // Check each tracked domain
      for (const [domain, currentPosition] of Object.entries(currentRankings.positions)) {
        const previousPosition = previousRankings.positions?.[domain];
        
        if (previousPosition === undefined) continue;

        const currentPos = typeof currentPosition === 'number' ? currentPosition : 101;
        const previousPos = typeof previousPosition === 'number' ? previousPosition : 101;
        const change = previousPos - currentPos;

        // Alert if change is 3 or more positions
        if (Math.abs(change) >= 3) {
          changes.push({
            keyword,
            domain,
            previousPosition: previousPos,
            currentPosition: currentPos,
            change: change,
            direction: change > 0 ? 'improved' : 'declined',
            significance: Math.abs(change) >= 10 ? 'major' : 'moderate'
          });
        }
      }
    } catch (error) {
      logError(error, `Detecting ranking changes for ${keyword}`);
    }

    return changes;
  }

  async saveRankingData(results) {
    const rankingsDir = path.join(dataDir, 'rankings');
    await fs.mkdir(rankingsDir, { recursive: true });

    // Save timestamped results
    const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const timestampedPath = path.join(rankingsDir, `rankings_${timestamp}.json`);
    await fs.writeFile(timestampedPath, JSON.stringify(results, null, 2));

    // Update history file
    const historyPath = path.join(rankingsDir, 'history.json');
    let history = {};
    
    try {
      const historyExists = await fs.access(historyPath).then(() => true).catch(() => false);
      if (historyExists) {
        history = JSON.parse(await fs.readFile(historyPath, 'utf8'));
      }
    } catch (error) {
      // Start fresh history
    }

    // Update history with current rankings
    for (const [keyword, rankings] of Object.entries(results.rankings)) {
      if (!rankings.error) {
        history[keyword] = rankings;
      }
    }

    await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
  }

  displayRankings(rankings) {
    console.log(chalk.gray('\n  Current Rankings:'));
    
    // Display WEO Media position
    const weoPosition = rankings.positions['WEO Media'];
    if (typeof weoPosition === 'number') {
      console.log(chalk.green(`  • WEO Media: #${weoPosition}`));
    } else {
      console.log(chalk.red(`  • WEO Media: ${weoPosition}`));
    }

    // Display competitor positions
    if (rankings.topCompetitors.length > 0) {
      console.log(chalk.gray('\n  Top Competitors:'));
      rankings.topCompetitors.slice(0, 5).forEach(comp => {
        console.log(chalk.yellow(`  • ${comp.name}: #${comp.position}`));
      });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      logSystem('Ranking tracker closed');
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default RankingTracker;