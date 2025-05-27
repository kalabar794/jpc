import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';
import EmailService from './email-service.js';
import { logAlert, logError } from '../utils/logger.js';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

export class AlertManager {
  constructor() {
    this.emailService = new EmailService();
    this.maxAlertsPerHour = parseInt(process.env.MAX_ALERTS_PER_HOUR) || 1;
    this.alertHistory = [];
  }

  async initialize() {
    await this.emailService.initialize();
    await this.loadAlertHistory();
    console.log(chalk.green('✓ Alert manager ready'));
  }

  async processCompetitorChanges(monitoringResults) {
    const allChanges = [];
    
    // Collect all changes
    for (const result of monitoringResults) {
      if (result.changes && result.changes.length > 0) {
        result.changes.forEach(change => {
          change.competitor = result.competitor;
          allChanges.push(change);
        });
      }
    }

    if (allChanges.length === 0) {
      console.log(chalk.gray('No changes detected - no alerts needed'));
      return;
    }

    // Check rate limiting
    if (!this.canSendAlert()) {
      console.log(chalk.yellow('⚠️  Alert rate limit reached - queuing for later'));
      await this.queueAlert('competitor', allChanges);
      return;
    }

    // Send alert
    try {
      await this.emailService.sendCompetitorAlert(allChanges, monitoringResults);
      this.recordAlert('competitor', allChanges.length);
      logAlert('sent', 'Competitor changes alert sent', { changes: allChanges.length });
    } catch (error) {
      logError(error, 'Sending competitor alert');
      console.log(chalk.red('✗ Failed to send competitor alert'));
    }
  }

  async processRankingChanges(rankingResults) {
    if (!rankingResults.changes || rankingResults.changes.length === 0) {
      console.log(chalk.gray('No ranking changes detected - no alerts needed'));
      return;
    }

    // Filter significant changes
    const significantChanges = rankingResults.changes.filter(change => 
      Math.abs(change.change) >= 3
    );

    if (significantChanges.length === 0) {
      return;
    }

    // Check rate limiting
    if (!this.canSendAlert()) {
      console.log(chalk.yellow('⚠️  Alert rate limit reached - queuing for later'));
      await this.queueAlert('ranking', significantChanges);
      return;
    }

    // Send alert
    try {
      await this.emailService.sendRankingAlert(significantChanges);
      this.recordAlert('ranking', significantChanges.length);
      logAlert('sent', 'Ranking changes alert sent', { changes: significantChanges.length });
    } catch (error) {
      logError(error, 'Sending ranking alert');
      console.log(chalk.red('✗ Failed to send ranking alert'));
    }
  }

  async sendWeeklyReport(weeklyData) {
    try {
      await this.emailService.sendWeeklyReport(weeklyData);
      this.recordAlert('weekly_report', 1);
      logAlert('sent', 'Weekly report sent', { timestamp: new Date().toISOString() });
      console.log(chalk.green('✓ Weekly report sent successfully'));
    } catch (error) {
      logError(error, 'Sending weekly report');
      console.log(chalk.red('✗ Failed to send weekly report'));
    }
  }

  canSendAlert() {
    const oneHourAgo = dayjs().subtract(1, 'hour');
    const recentAlerts = this.alertHistory.filter(alert => 
      dayjs(alert.timestamp).isAfter(oneHourAgo)
    );
    
    return recentAlerts.length < this.maxAlertsPerHour;
  }

  recordAlert(type, changeCount) {
    const alert = {
      type,
      timestamp: new Date().toISOString(),
      changeCount
    };
    
    this.alertHistory.push(alert);
    
    // Keep only last 24 hours of history
    const oneDayAgo = dayjs().subtract(24, 'hours');
    this.alertHistory = this.alertHistory.filter(alert =>
      dayjs(alert.timestamp).isAfter(oneDayAgo)
    );
    
    // Save history
    this.saveAlertHistory();
  }

  async queueAlert(type, data) {
    const queueDir = path.join(dataDir, 'alerts', 'queue');
    await fs.mkdir(queueDir, { recursive: true });
    
    const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `${type}_${timestamp}.json`;
    const filepath = path.join(queueDir, filename);
    
    await fs.writeFile(filepath, JSON.stringify({
      type,
      data,
      queuedAt: new Date().toISOString()
    }, null, 2));
    
    logAlert('queued', `Alert queued due to rate limiting`, { type, filename });
  }

  async processQueuedAlerts() {
    const queueDir = path.join(dataDir, 'alerts', 'queue');
    
    try {
      const files = await fs.readdir(queueDir);
      
      for (const file of files) {
        if (!this.canSendAlert()) {
          console.log(chalk.yellow('Rate limit still active - stopping queue processing'));
          break;
        }
        
        const filepath = path.join(queueDir, file);
        const queuedAlert = JSON.parse(await fs.readFile(filepath, 'utf8'));
        
        // Process based on type
        if (queuedAlert.type === 'competitor') {
          await this.emailService.sendCompetitorAlert(queuedAlert.data, []);
        } else if (queuedAlert.type === 'ranking') {
          await this.emailService.sendRankingAlert(queuedAlert.data);
        }
        
        // Remove from queue
        await fs.unlink(filepath);
        this.recordAlert(queuedAlert.type, queuedAlert.data.length);
        
        console.log(chalk.green(`✓ Processed queued ${queuedAlert.type} alert`));
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        logError(error, 'Processing queued alerts');
      }
    }
  }

  async loadAlertHistory() {
    try {
      const historyPath = path.join(dataDir, 'alerts', 'history.json');
      const historyExists = await fs.access(historyPath).then(() => true).catch(() => false);
      
      if (historyExists) {
        this.alertHistory = JSON.parse(await fs.readFile(historyPath, 'utf8'));
      }
    } catch (error) {
      logError(error, 'Loading alert history');
    }
  }

  async saveAlertHistory() {
    try {
      const alertsDir = path.join(dataDir, 'alerts');
      await fs.mkdir(alertsDir, { recursive: true });
      
      const historyPath = path.join(alertsDir, 'history.json');
      await fs.writeFile(historyPath, JSON.stringify(this.alertHistory, null, 2));
    } catch (error) {
      logError(error, 'Saving alert history');
    }
  }
}

export default AlertManager;