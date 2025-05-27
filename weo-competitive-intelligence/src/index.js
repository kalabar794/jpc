import { CompetitorScraper } from './scrapers/competitorScraper.js';
import { competitors } from './config/competitors.js';
import { generateReport } from './utils/reportGenerator.js';
import { sendEmailReport } from './utils/emailer.js';
import { compareWithPrevious } from './utils/changeDetector.js';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function ensureDirectories() {
  const dirs = [
    './output',
    './output/screenshots',
    './output/reports',
    './output/data'
  ];
  
  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function runCompetitiveAnalysis() {
  console.log(chalk.bold.cyan('\n🔍 WEO Competitive Intelligence Scanner\n'));
  console.log(chalk.gray(`Started at: ${new Date().toLocaleString()}\n`));

  const scraper = new CompetitorScraper();
  const allResults = [];

  try {
    await ensureDirectories();
    await scraper.initialize();

    // Scrape each competitor
    for (const competitor of competitors) {
      console.log(chalk.bold(`\n📊 Analyzing ${competitor.name}...`));
      const results = await scraper.scrapeCompetitor(competitor);
      allResults.push(results);
      
      // Save individual competitor data
      await fs.writeFile(
        `./output/data/${competitor.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`,
        JSON.stringify(results, null, 2)
      );
    }

    // Compare with previous scan
    console.log(chalk.bold('\n🔄 Detecting changes...'));
    const changes = await compareWithPrevious(allResults);

    // Generate comprehensive report
    console.log(chalk.bold('\n📄 Generating report...'));
    const report = await generateReport(allResults, changes);

    // Save report
    const reportPath = `./output/reports/competitive-analysis-${Date.now()}.html`;
    await fs.writeFile(reportPath, report);
    console.log(chalk.green(`✓ Report saved to: ${reportPath}`));

    // Send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_TO) {
      console.log(chalk.bold('\n📧 Sending email report...'));
      await sendEmailReport(report, changes);
      console.log(chalk.green('✓ Email sent successfully'));
    }

  } catch (error) {
    console.error(chalk.red(`\n✗ Error: ${error.message}`));
    console.error(error.stack);
  } finally {
    await scraper.close();
  }

  console.log(chalk.bold.green('\n✓ Analysis complete!\n'));
}

// Run immediately if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCompetitiveAnalysis();
}

export { runCompetitiveAnalysis };