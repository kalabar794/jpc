import puppeteer from 'puppeteer';
import { monitoringKeywords } from '../config/keywords.js';
import chalk from 'chalk';

export class CompetitorScraper {
  constructor() {
    this.browser = null;
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log(chalk.green('✓ Browser initialized'));
  }

  async scrapeCompetitor(competitor) {
    const page = await this.browser.newPage();
    const results = {
      competitor: competitor.name,
      domain: competitor.domain,
      timestamp: new Date().toISOString(),
      data: {}
    };

    try {
      // Set user agent to appear as regular browser
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
      
      // Scrape each defined path
      for (const [pathName, pathUrl] of Object.entries(competitor.paths)) {
        console.log(chalk.blue(`Scraping ${competitor.name} - ${pathName}...`));
        
        const url = `https://${competitor.domain}${pathUrl}`;
        try {
          await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
          });

          // Wait a bit to ensure dynamic content loads
          await page.waitForTimeout(2000);

          // Extract page data
          const pageData = await this.extractPageData(page, competitor, pathName);
          results.data[pathName] = pageData;

          // Take screenshot for visual comparison
          await page.screenshot({
            path: `./output/screenshots/${competitor.name}-${pathName}-${Date.now()}.png`,
            fullPage: true
          });

        } catch (error) {
          console.log(chalk.yellow(`⚠ Error scraping ${url}: ${error.message}`));
          results.data[pathName] = { error: error.message };
        }
      }

      // Analyze for specific insights
      results.insights = await this.analyzeCompetitorData(results.data);

    } catch (error) {
      console.log(chalk.red(`✗ Error scraping ${competitor.name}: ${error.message}`));
      results.error = error.message;
    } finally {
      await page.close();
    }

    return results;
  }

  async extractPageData(page, competitor, pathName) {
    const data = await page.evaluate((selectors, keywords) => {
      const results = {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || '',
        headings: {},
        content: {},
        keywords: {}
      };

      // Extract headings
      ['h1', 'h2', 'h3'].forEach(tag => {
        results.headings[tag] = Array.from(document.querySelectorAll(tag))
          .map(el => el.textContent.trim());
      });

      // Extract content based on selectors
      if (selectors[pathName]) {
        const elements = document.querySelectorAll(selectors[pathName]);
        results.content[pathName] = Array.from(elements).map(el => ({
          text: el.textContent.trim(),
          html: el.innerHTML
        }));
      }

      // Search for keywords
      const pageText = document.body.textContent.toLowerCase();
      Object.entries(keywords).forEach(([category, terms]) => {
        results.keywords[category] = terms.filter(term => 
          pageText.includes(term.toLowerCase())
        );
      });

      // Extract pricing if visible
      const priceRegex = /\$[\d,]+(?:\.\d{2})?(?:\/(?:mo|month|year))?/gi;
      const prices = pageText.match(priceRegex) || [];
      if (prices.length > 0) {
        results.pricing = [...new Set(prices)];
      }

      return results;
    }, competitor.selectors, monitoringKeywords);

    return data;
  }

  async analyzeCompetitorData(data) {
    const insights = {
      hasPricing: false,
      priceRanges: [],
      features: [],
      promotions: [],
      technologies: []
    };

    // Analyze collected data
    Object.values(data).forEach(pageData => {
      if (pageData.pricing) {
        insights.hasPricing = true;
        insights.priceRanges.push(...pageData.pricing);
      }

      if (pageData.keywords) {
        if (pageData.keywords.features) {
          insights.features.push(...pageData.keywords.features);
        }
        if (pageData.keywords.promotions) {
          insights.promotions.push(...pageData.keywords.promotions);
        }
        if (pageData.keywords.technology) {
          insights.technologies.push(...pageData.keywords.technology);
        }
      }
    });

    // Remove duplicates
    insights.priceRanges = [...new Set(insights.priceRanges)];
    insights.features = [...new Set(insights.features)];
    insights.promotions = [...new Set(insights.promotions)];
    insights.technologies = [...new Set(insights.technologies)];

    return insights;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log(chalk.green('✓ Browser closed'));
    }
  }
}