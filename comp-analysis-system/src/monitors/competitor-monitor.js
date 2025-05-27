import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';
import { competitors } from '../config/competitors.js';
import { logCompetitorCheck, logError, logSystem } from '../utils/logger.js';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

export class CompetitorMonitor {
  constructor() {
    this.browser = null;
    this.requestDelay = parseInt(process.env.REQUEST_DELAY_MS) || 5000;
    this.headless = process.env.HEADLESS_MODE === 'true';
    this.screenshotQuality = parseInt(process.env.SCREENSHOT_QUALITY) || 80;
  }

  async initialize() {
    try {
      this.browser = await chromium.launch({
        headless: this.headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      logSystem('Competitor monitor initialized');
      console.log(chalk.green('✓ Competitor monitor ready'));
    } catch (error) {
      logError(error, 'Failed to initialize browser');
      throw error;
    }
  }

  async monitorAll() {
    console.log(chalk.bold.cyan('\n🔍 Starting competitor monitoring...\n'));
    const results = [];

    for (const competitor of competitors) {
      console.log(chalk.blue(`\nMonitoring ${competitor.name}...`));
      
      try {
        const competitorData = await this.monitorCompetitor(competitor);
        results.push(competitorData);
        
        // Compare with previous data
        const changes = await this.detectChanges(competitor.id, competitorData);
        if (changes.length > 0) {
          console.log(chalk.yellow(`⚠️  ${changes.length} changes detected!`));
          competitorData.changes = changes;
        } else {
          console.log(chalk.gray('No changes detected'));
        }
        
        // Save current data
        await this.saveCompetitorData(competitor.id, competitorData);
        
        // Delay between competitors
        await this.delay(this.requestDelay);
        
      } catch (error) {
        console.log(chalk.red(`✗ Error monitoring ${competitor.name}: ${error.message}`));
        logError(error, `Monitoring ${competitor.name}`);
        results.push({
          competitor: competitor.name,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    return results;
  }

  async monitorCompetitor(competitor) {
    const page = await this.browser.newPage();
    const data = {
      competitor: competitor.name,
      competitorId: competitor.id,
      timestamp: new Date().toISOString(),
      pages: {}
    };

    try {
      // Set user agent to avoid bot detection
      await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      });
      
      // Monitor each URL
      for (const [pageType, url] of Object.entries(competitor.urls)) {
        console.log(chalk.gray(`  Checking ${pageType} page...`));
        
        try {
          // Navigate to page
          await page.goto(url, { 
            waitUntil: 'networkidle', 
            timeout: 30000 
          });
          
          // Wait for content to load
          await page.waitForTimeout(2000);
          
          // Extract page data
          const pageData = await this.extractPageData(page, competitor, pageType);
          data.pages[pageType] = pageData;
          
          // Take screenshot
          const screenshotPath = await this.captureScreenshot(page, competitor.id, pageType);
          pageData.screenshot = screenshotPath;
          
          // Log success
          logCompetitorCheck(competitor, {
            page: pageType,
            url: url,
            success: true
          });
          
        } catch (error) {
          console.log(chalk.yellow(`    ⚠️  Error on ${pageType}: ${error.message}`));
          data.pages[pageType] = { error: error.message };
        }
        
        // Delay between pages
        await this.delay(2000);
      }
      
    } finally {
      await page.close();
    }

    return data;
  }

  async extractPageData(page, competitor, pageType) {
    const data = await page.evaluate((selectors, pageType) => {
      const extractedData = {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || '',
        url: window.location.href,
        lastModified: document.lastModified,
        content: {}
      };

      // Extract H1 and H2 tags
      extractedData.headings = {
        h1: Array.from(document.querySelectorAll('h1')).map(el => el.textContent.trim()),
        h2: Array.from(document.querySelectorAll('h2')).map(el => el.textContent.trim())
      };

      // Extract specific selectors based on page type
      if (selectors[pageType]) {
        const elements = document.querySelectorAll(selectors[pageType]);
        extractedData.content[pageType] = Array.from(elements).map(el => ({
          text: el.textContent.trim(),
          tag: el.tagName.toLowerCase(),
          classes: el.className
        }));
      }

      // Extract all text content for general tracking
      const textContent = document.body.innerText;
      
      // Look for pricing information
      const priceMatches = textContent.match(/\$[\d,]+(?:\.\d{2})?(?:\/(?:mo|month|year))?/gi) || [];
      if (priceMatches.length > 0) {
        extractedData.pricing = [...new Set(priceMatches)];
      }

      // Look for statistics/numbers
      const statMatches = textContent.match(/\b\d{1,3}(?:,\d{3})*\+?\s*(?:clients?|customers?|practices?|reviews?)\b/gi) || [];
      if (statMatches.length > 0) {
        extractedData.statistics = [...new Set(statMatches)];
      }

      // Generate content hash for change detection
      extractedData.contentHash = btoa(textContent).substring(0, 32);

      return extractedData;
    }, competitor.selectors, pageType);

    return data;
  }

  async captureScreenshot(page, competitorId, pageType) {
    const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `${competitorId}_${pageType}_${timestamp}.jpg`;
    const filepath = path.join(dataDir, 'screenshots', filename);

    await page.screenshot({
      path: filepath,
      fullPage: true,
      quality: this.screenshotQuality,
      type: 'jpeg'
    });

    return filename;
  }

  async detectChanges(competitorId, currentData) {
    const changes = [];
    
    try {
      // Load previous data
      const previousDataPath = path.join(dataDir, 'competitors', `${competitorId}_latest.json`);
      const previousExists = await fs.access(previousDataPath).then(() => true).catch(() => false);
      
      if (!previousExists) {
        return changes; // No previous data to compare
      }

      const previousData = JSON.parse(await fs.readFile(previousDataPath, 'utf8'));

      // Compare each page
      for (const [pageType, currentPage] of Object.entries(currentData.pages)) {
        const previousPage = previousData.pages?.[pageType];
        
        if (!previousPage || currentPage.error) continue;

        // Check title changes
        if (currentPage.title !== previousPage.title) {
          changes.push({
            type: 'title_change',
            page: pageType,
            old: previousPage.title,
            new: currentPage.title
          });
        }

        // Check meta description changes
        if (currentPage.metaDescription !== previousPage.metaDescription) {
          changes.push({
            type: 'meta_change',
            page: pageType,
            old: previousPage.metaDescription,
            new: currentPage.metaDescription
          });
        }

        // Check content hash changes
        if (currentPage.contentHash !== previousPage.contentHash) {
          changes.push({
            type: 'content_change',
            page: pageType,
            significance: 'check_screenshot'
          });
        }

        // Check pricing changes
        const oldPricing = JSON.stringify(previousPage.pricing || []);
        const newPricing = JSON.stringify(currentPage.pricing || []);
        if (oldPricing !== newPricing) {
          changes.push({
            type: 'pricing_change',
            page: pageType,
            old: previousPage.pricing,
            new: currentPage.pricing,
            priority: 'high'
          });
        }

        // Check statistics changes
        const oldStats = JSON.stringify(previousPage.statistics || []);
        const newStats = JSON.stringify(currentPage.statistics || []);
        if (oldStats !== newStats) {
          changes.push({
            type: 'statistics_change',
            page: pageType,
            old: previousPage.statistics,
            new: currentPage.statistics
          });
        }
      }
    } catch (error) {
      logError(error, `Detecting changes for ${competitorId}`);
    }

    return changes;
  }

  async saveCompetitorData(competitorId, data) {
    const competitorDir = path.join(dataDir, 'competitors');
    await fs.mkdir(competitorDir, { recursive: true });

    // Save timestamped version
    const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const timestampedPath = path.join(competitorDir, `${competitorId}_${timestamp}.json`);
    await fs.writeFile(timestampedPath, JSON.stringify(data, null, 2));

    // Save latest version for comparison
    const latestPath = path.join(competitorDir, `${competitorId}_latest.json`);
    await fs.writeFile(latestPath, JSON.stringify(data, null, 2));
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      logSystem('Competitor monitor closed');
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default CompetitorMonitor;