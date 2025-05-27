import dotenv from 'dotenv';
import chalk from 'chalk';
import CompetitorMonitor from './monitors/competitor-monitor.js';
import RankingTracker from './monitors/ranking-tracker.js';
import EmailService from './alerts/email-service.js';
import { competitors } from './config/competitors.js';
import { primaryKeywords } from './config/keywords.js';

// Load environment variables
dotenv.config();

console.log(chalk.bold.cyan('\n🧪 WEO Competitive Intelligence - Test Run\n'));

async function testCompetitorMonitor() {
  console.log(chalk.bold.yellow('\n1. Testing Competitor Monitor\n'));
  
  const monitor = new CompetitorMonitor();
  
  try {
    await monitor.initialize();
    
    // Test monitoring first competitor only
    const testCompetitor = competitors[0];
    console.log(chalk.blue(`Testing monitor for ${testCompetitor.name}...`));
    
    const result = await monitor.monitorCompetitor(testCompetitor);
    
    console.log(chalk.green('✓ Competitor monitoring successful!'));
    console.log(chalk.gray(`  Pages checked: ${Object.keys(result.pages).length}`));
    console.log(chalk.gray(`  Screenshot captured: ${result.pages.home?.screenshot ? 'Yes' : 'No'}`));
    
    await monitor.close();
    return true;
  } catch (error) {
    console.log(chalk.red(`✗ Competitor monitoring failed: ${error.message}`));
    await monitor.close();
    return false;
  }
}

async function testRankingTracker() {
  console.log(chalk.bold.yellow('\n2. Testing Ranking Tracker\n'));
  
  const tracker = new RankingTracker();
  
  try {
    await tracker.initialize();
    
    // Test with just one keyword
    const testKeyword = primaryKeywords[0];
    console.log(chalk.blue(`Testing rankings for "${testKeyword}"...`));
    
    const rankings = await tracker.checkKeywordRankings(testKeyword);
    
    console.log(chalk.green('✓ Ranking check successful!'));
    console.log(chalk.gray(`  WEO Media position: ${rankings.positions['WEO Media']}`));
    console.log(chalk.gray(`  Competitors found: ${rankings.topCompetitors.length}`));
    
    await tracker.close();
    return true;
  } catch (error) {
    console.log(chalk.red(`✗ Ranking check failed: ${error.message}`));
    await tracker.close();
    return false;
  }
}

async function testEmailService() {
  console.log(chalk.bold.yellow('\n3. Testing Email Service\n'));
  
  const emailService = new EmailService();
  
  try {
    await emailService.initialize();
    
    // Send test email
    console.log(chalk.blue('Sending test email...'));
    
    const testHtml = `
      <h1>WEO Competitive Intelligence - Test Email</h1>
      <p>This is a test email from your competitive intelligence system.</p>
      <p>If you received this, your email configuration is working correctly!</p>
      <hr>
      <p>System Time: ${new Date().toLocaleString()}</p>
    `;
    
    await emailService.sendEmail(
      '🧪 WEO Intelligence System - Test Email',
      testHtml,
      'info'
    );
    
    console.log(chalk.green('✓ Email sent successfully!'));
    return true;
  } catch (error) {
    console.log(chalk.red(`✗ Email test failed: ${error.message}`));
    console.log(chalk.yellow('\nEmail Configuration Help:'));
    console.log(chalk.gray('1. Make sure EMAIL_USER is set in .env'));
    console.log(chalk.gray('2. Make sure EMAIL_PASS is a Gmail app password (not regular password)'));
    console.log(chalk.gray('3. Enable 2FA on your Google account'));
    console.log(chalk.gray('4. Generate app password at: https://myaccount.google.com/apppasswords'));
    return false;
  }
}

async function checkConfiguration() {
  console.log(chalk.bold.yellow('\n4. Checking Configuration\n'));
  
  const requiredEnvVars = [
    'EMAIL_USER',
    'EMAIL_PASS',
    'EMAIL_TO'
  ];
  
  let configValid = true;
  
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      console.log(chalk.green(`✓ ${envVar} is set`));
    } else {
      console.log(chalk.red(`✗ ${envVar} is missing`));
      configValid = false;
    }
  }
  
  // Check optional settings
  console.log(chalk.gray('\nOptional settings:'));
  console.log(chalk.gray(`  HEADLESS_MODE: ${process.env.HEADLESS_MODE || 'true (default)'}`));
  console.log(chalk.gray(`  REQUEST_DELAY_MS: ${process.env.REQUEST_DELAY_MS || '5000 (default)'}`));
  console.log(chalk.gray(`  MAX_ALERTS_PER_HOUR: ${process.env.MAX_ALERTS_PER_HOUR || '1 (default)'}`));
  
  return configValid;
}

async function runAllTests() {
  console.log(chalk.gray('This will test all components of the system.\n'));
  
  // Check configuration first
  const configValid = await checkConfiguration();
  if (!configValid) {
    console.log(chalk.red('\n✗ Configuration errors found. Please fix .env file first.'));
    return;
  }
  
  // Run tests
  const results = {
    competitor: await testCompetitorMonitor(),
    ranking: await testRankingTracker(),
    email: await testEmailService()
  };
  
  // Summary
  console.log(chalk.bold.cyan('\n📊 Test Summary\n'));
  
  const passed = Object.values(results).filter(r => r).length;
  const total = Object.values(results).length;
  
  if (passed === total) {
    console.log(chalk.bold.green(`✅ All tests passed! (${passed}/${total})`));
    console.log(chalk.gray('\nYour system is ready to run!'));
    console.log(chalk.gray('Start monitoring with: npm start'));
  } else {
    console.log(chalk.bold.red(`❌ Some tests failed (${passed}/${total})`));
    console.log(chalk.gray('\nPlease fix the issues above before running the system.'));
  }
}

// Run tests
runAllTests().catch(error => {
  console.error(chalk.red('Test run failed:'), error);
  process.exit(1);
});