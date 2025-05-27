import cron from 'node-cron';
import { runCompetitiveAnalysis } from './index.js';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

// Default schedule: Every Monday at 9 AM
const schedule = process.env.SCAN_SCHEDULE || '0 9 * * 1';

console.log(chalk.bold.cyan('🕐 WEO Competitive Intelligence Scheduler\n'));
console.log(chalk.yellow(`Schedule: ${schedule}`));
console.log(chalk.gray('Waiting for next scheduled run...\n'));

// Schedule the task
const task = cron.schedule(schedule, async () => {
  console.log(chalk.bold.green('\n⏰ Scheduled scan starting...\n'));
  
  try {
    await runCompetitiveAnalysis();
  } catch (error) {
    console.error(chalk.red('Error during scheduled scan:'), error);
  }
}, {
  scheduled: true,
  timezone: "America/Los_Angeles"
});

// Start the scheduler
task.start();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\nStopping scheduler...'));
  task.stop();
  process.exit(0);
});

console.log(chalk.green('✓ Scheduler is running'));
console.log(chalk.gray('Press Ctrl+C to stop\n'));