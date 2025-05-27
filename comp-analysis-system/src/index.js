import dotenv from 'dotenv';
import cron from 'node-cron';
import chalk from 'chalk';
import CompetitorMonitor from './monitors/competitor-monitor.js';
import RankingTracker from './monitors/ranking-tracker.js';
import AlertManager from './alerts/alert-manager.js';
import { logSystem, logError } from './utils/logger.js';
import { cleanupOldData } from './utils/cleanup.js';
import { generateWeeklyReport } from './utils/report-generator.js';

// Load environment variables
dotenv.config();

// Initialize components
const competitorMonitor = new CompetitorMonitor();
const rankingTracker = new RankingTracker();
const alertManager = new AlertManager();

// Track if monitors are running to prevent overlap
let isMonitoringCompetitors = false;
let isTrackingRankings = false;

async function initialize() {
  console.log(chalk.bold.cyan('\n🚀 WEO Competitive Intelligence System\n'));
  console.log(chalk.gray('Initializing components...\n'));

  try {
    await competitorMonitor.initialize();
    await rankingTracker.initialize();
    await alertManager.initialize();
    
    logSystem('System initialized successfully');
    console.log(chalk.bold.green('\n✓ All systems ready!\n'));
    
    // Process any queued alerts
    await alertManager.processQueuedAlerts();
    
    return true;
  } catch (error) {
    logError(error, 'System initialization failed');
    console.log(chalk.red('\n✗ Initialization failed!\n'));
    return false;
  }
}

async function runCompetitorMonitoring() {
  if (isMonitoringCompetitors) {
    console.log(chalk.yellow('⚠️  Competitor monitoring already in progress'));
    return;
  }

  isMonitoringCompetitors = true;
  logSystem('Starting competitor monitoring');

  try {
    const results = await competitorMonitor.monitorAll();
    await alertManager.processCompetitorChanges(results);
  } catch (error) {
    logError(error, 'Competitor monitoring failed');
  } finally {
    isMonitoringCompetitors = false;
  }
}

async function runRankingTracking(isWeekly = false) {
  if (isTrackingRankings) {
    console.log(chalk.yellow('⚠️  Ranking tracking already in progress'));
    return;
  }

  isTrackingRankings = true;
  logSystem('Starting ranking tracking', { weekly: isWeekly });

  try {
    const results = await rankingTracker.trackRankings(isWeekly);
    await alertManager.processRankingChanges(results);
  } catch (error) {
    logError(error, 'Ranking tracking failed');
  } finally {
    isTrackingRankings = false;
  }
}

async function runWeeklyReport() {
  logSystem('Generating weekly report');
  
  try {
    const reportData = await generateWeeklyReport();
    await alertManager.sendWeeklyReport(reportData);
  } catch (error) {
    logError(error, 'Weekly report generation failed');
  }
}

async function setupSchedules() {
  console.log(chalk.bold.cyan('📅 Setting up schedules...\n'));

  // Competitor monitoring - every 6 hours
  const competitorSchedule = process.env.COMPETITOR_SCHEDULE || '0 */6 * * *';
  cron.schedule(competitorSchedule, async () => {
    console.log(chalk.bold.blue('\n⏰ Scheduled competitor monitoring starting...\n'));
    await runCompetitorMonitoring();
  }, {
    timezone: "America/Los_Angeles"
  });
  console.log(chalk.gray(`✓ Competitor monitoring: ${competitorSchedule}`));

  // Daily ranking check - 2 AM
  const rankingSchedule = process.env.RANKING_SCHEDULE || '0 2 * * *';
  cron.schedule(rankingSchedule, async () => {
    console.log(chalk.bold.blue('\n⏰ Scheduled ranking tracking starting...\n'));
    await runRankingTracking(false);
  }, {
    timezone: "America/Los_Angeles"
  });
  console.log(chalk.gray(`✓ Daily rankings: ${rankingSchedule}`));

  // Weekly comprehensive ranking check - Monday 3 AM
  const weeklyRankingSchedule = process.env.PERFORMANCE_SCHEDULE || '0 3 * * 1';
  cron.schedule(weeklyRankingSchedule, async () => {
    console.log(chalk.bold.blue('\n⏰ Weekly comprehensive ranking check starting...\n'));
    await runRankingTracking(true);
  }, {
    timezone: "America/Los_Angeles"
  });
  console.log(chalk.gray(`✓ Weekly rankings: ${weeklyRankingSchedule}`));

  // Weekly report - Monday 9 AM
  const reportSchedule = process.env.REPORT_SCHEDULE || '0 9 * * 1';
  cron.schedule(reportSchedule, async () => {
    console.log(chalk.bold.blue('\n⏰ Generating weekly report...\n'));
    await runWeeklyReport();
  }, {
    timezone: "America/Los_Angeles"
  });
  console.log(chalk.gray(`✓ Weekly reports: ${reportSchedule}`));

  // Daily cleanup - 4 AM
  cron.schedule('0 4 * * *', async () => {
    console.log(chalk.bold.blue('\n⏰ Running data cleanup...\n'));
    await cleanupOldData();
  }, {
    timezone: "America/Los_Angeles"
  });
  console.log(chalk.gray(`✓ Daily cleanup: 0 4 * * *`));

  console.log(chalk.green('\n✓ All schedules configured\n'));
}

// Graceful shutdown
async function shutdown() {
  console.log(chalk.yellow('\n\nShutting down gracefully...'));
  
  try {
    await competitorMonitor.close();
    await rankingTracker.close();
    logSystem('System shutdown complete');
    console.log(chalk.green('✓ Shutdown complete\n'));
    process.exit(0);
  } catch (error) {
    logError(error, 'Shutdown error');
    process.exit(1);
  }
}

// Handle process signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Main execution
async function main() {
  const initialized = await initialize();
  
  if (!initialized) {
    console.log(chalk.red('Failed to initialize. Exiting...'));
    process.exit(1);
  }

  // Set up scheduled tasks
  await setupSchedules();

  // Run initial checks if in development
  if (process.env.NODE_ENV === 'development') {
    console.log(chalk.yellow('\n🚀 Development mode - running initial checks...\n'));
    await runCompetitorMonitoring();
    // await runRankingTracking(); // Commented out to avoid Google rate limiting in dev
  }

  console.log(chalk.bold.green('\n✨ WEO Competitive Intelligence System is running!\n'));
  console.log(chalk.gray('Press Ctrl+C to stop\n'));
}

// Start the system
main().catch(error => {
  console.error(chalk.red('Fatal error:'), error);
  logError(error, 'Fatal system error');
  process.exit(1);
});