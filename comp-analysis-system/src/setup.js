import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log(chalk.bold.cyan('\n🚀 WEO Competitive Intelligence System - Setup\n'));

async function setupDirectories() {
  console.log(chalk.yellow('Creating directory structure...'));
  
  const directories = [
    'data',
    'data/screenshots',
    'data/screenshots/rankings',
    'data/rankings',
    'data/reports',
    'data/logs',
    'data/competitors',
    'data/alerts',
    'data/alerts/queue'
  ];

  for (const dir of directories) {
    await fs.mkdir(path.join(rootDir, dir), { recursive: true });
    console.log(chalk.gray(`  ✓ Created ${dir}`));
  }
  
  console.log(chalk.green('✓ Directory structure created\n'));
}

async function setupEnvironment() {
  console.log(chalk.yellow('Setting up environment configuration...\n'));
  
  const envPath = path.join(rootDir, '.env');
  const envExamplePath = path.join(rootDir, '.env.example');
  
  // Check if .env already exists
  const envExists = await fs.access(envPath).then(() => true).catch(() => false);
  
  if (envExists) {
    const overwrite = await question(chalk.yellow('.env file already exists. Overwrite? (y/N): '));
    if (overwrite.toLowerCase() !== 'y') {
      console.log(chalk.gray('Keeping existing .env file\n'));
      return;
    }
  }

  // Collect configuration
  console.log(chalk.cyan('\nEmail Configuration (Gmail):'));
  const emailUser = await question('Email address: ');
  const emailPass = await question('App password (16 characters): ');
  const emailTo = await question('Send alerts to: ');
  const emailCc = await question('CC alerts to (optional): ');

  console.log(chalk.cyan('\nMonitoring Settings:'));
  const headless = await question('Run browser in headless mode? (Y/n): ');
  const maxAlerts = await question('Max alerts per hour (default: 1): ');

  // Create .env file
  const envContent = `# Email Configuration (Gmail)
EMAIL_USER=${emailUser}
EMAIL_PASS=${emailPass}
EMAIL_TO=${emailTo}
EMAIL_CC=${emailCc}

# Alert Settings
MAX_ALERTS_PER_HOUR=${maxAlerts || '1'}
ALERT_PRIORITY_THRESHOLD=warning

# Monitoring Settings
HEADLESS_MODE=${headless.toLowerCase() !== 'n' ? 'true' : 'false'}
SCREENSHOT_QUALITY=80
REQUEST_DELAY_MS=5000
MAX_RETRIES=3

# Data Retention
KEEP_SCREENSHOTS_DAYS=30
KEEP_RANKINGS_DAYS=90
KEEP_LOGS_DAYS=7

# Scheduling (cron format)
COMPETITOR_SCHEDULE=0 */6 * * *     # Every 6 hours
RANKING_SCHEDULE=0 2 * * *          # Daily at 2 AM
PERFORMANCE_SCHEDULE=0 3 * * 1      # Weekly Monday 3 AM
REPORT_SCHEDULE=0 9 * * 1           # Weekly Monday 9 AM

# Environment
NODE_ENV=production
LOG_LEVEL=info
`;

  await fs.writeFile(envPath, envContent);
  console.log(chalk.green('\n✓ Environment configuration saved\n'));
}

async function installDependencies() {
  console.log(chalk.yellow('Checking dependencies...\n'));
  
  const packageJsonPath = path.join(rootDir, 'package.json');
  const nodeModulesPath = path.join(rootDir, 'node_modules');
  
  const nodeModulesExists = await fs.access(nodeModulesPath).then(() => true).catch(() => false);
  
  if (!nodeModulesExists) {
    console.log(chalk.cyan('Dependencies not installed. Please run:'));
    console.log(chalk.bold.white('  npm install'));
    console.log(chalk.gray('\nThis will install all required packages.\n'));
  } else {
    console.log(chalk.green('✓ Dependencies already installed\n'));
  }
}

async function showNextSteps() {
  console.log(chalk.bold.cyan('\n✨ Setup Complete!\n'));
  
  console.log(chalk.yellow('Next steps:\n'));
  
  console.log(chalk.white('1. Install dependencies (if not done):'));
  console.log(chalk.gray('   npm install\n'));
  
  console.log(chalk.white('2. Test your configuration:'));
  console.log(chalk.gray('   npm test\n'));
  
  console.log(chalk.white('3. Start the monitoring system:'));
  console.log(chalk.gray('   npm start\n'));
  
  console.log(chalk.white('4. For production deployment with PM2:'));
  console.log(chalk.gray('   npm install -g pm2'));
  console.log(chalk.gray('   pm2 start src/index.js --name weo-intelligence'));
  console.log(chalk.gray('   pm2 save'));
  console.log(chalk.gray('   pm2 startup\n'));
  
  console.log(chalk.bold.green('Happy monitoring! 🎯\n'));
}

async function main() {
  try {
    await setupDirectories();
    await setupEnvironment();
    await installDependencies();
    await showNextSteps();
  } catch (error) {
    console.error(chalk.red('\nSetup failed:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();