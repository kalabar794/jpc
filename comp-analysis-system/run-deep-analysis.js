import { DeepCompetitorAnalyzer } from './src/analyzers/deep-competitor-analyzer.js';
import chalk from 'chalk';

console.log(chalk.bold.cyan('\n🔍 Running Deep Competitor Analysis...\n'));
console.log(chalk.yellow('This will analyze all competitors and may take a few minutes...\n'));

const analyzer = new DeepCompetitorAnalyzer();

try {
  await analyzer.initialize();
  console.log(chalk.green('✓ Browser initialized\n'));
  
  const results = await analyzer.analyzeAll();
  console.log(chalk.green('\n✓ Analysis complete!'));
  
  const matrix = await analyzer.generateMatrix();
  
  // Display summary
  console.log(chalk.bold.cyan('\n📊 Analysis Summary:\n'));
  
  // Show blog leaders
  console.log(chalk.bold('📝 Blog Activity Leaders:'));
  if (matrix.summary.mostActiveBlogs.length > 0) {
    matrix.summary.mostActiveBlogs.forEach(leader => {
      console.log(chalk.green(`  - ${leader}`));
    });
  } else {
    console.log(chalk.gray('  No blog data collected yet'));
  }
  
  // Show social media leaders
  console.log(chalk.bold('\n📱 Social Media Leaders:'));
  if (matrix.summary.socialMediaLeaders.length > 0) {
    matrix.summary.socialMediaLeaders.forEach(leader => {
      console.log(chalk.blue(`  - ${leader}`));
    });
  } else {
    console.log(chalk.gray('  No social media data collected yet'));
  }
  
  // Show content leaders
  console.log(chalk.bold('\n📚 Content Diversity Leaders:'));
  if (matrix.summary.contentLeaders.length > 0) {
    matrix.summary.contentLeaders.forEach(leader => {
      console.log(chalk.magenta(`  - ${leader}`));
    });
  } else {
    console.log(chalk.gray('  No content data collected yet'));
  }
  
  console.log(chalk.green('\n✓ Data saved to data/deep-analysis/latest.json'));
  console.log(chalk.yellow('\nYou can now view the results in the dashboard at:'));
  console.log(chalk.bold.cyan('http://localhost:3456/matrix\n'));
  
} catch (error) {
  console.error(chalk.red('\n❌ Analysis failed:'), error);
  console.error(chalk.yellow('\nTroubleshooting tips:'));
  console.error(chalk.gray('1. Make sure you have a stable internet connection'));
  console.error(chalk.gray('2. Some competitor sites may be blocking automated access'));
  console.error(chalk.gray('3. Try running with HEADLESS_MODE=false to see what\'s happening'));
} finally {
  await analyzer.close();
  process.exit(0);
}