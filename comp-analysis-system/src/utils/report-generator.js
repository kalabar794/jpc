import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';
import { competitors } from '../config/competitors.js';
import { formatBytes } from './helpers.js';
import { getDataUsage } from './cleanup.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

export async function generateWeeklyReport() {
  const weekStart = dayjs().startOf('week');
  const weekEnd = dayjs().endOf('week');
  
  const reportData = {
    period: {
      start: weekStart.format('YYYY-MM-DD'),
      end: weekEnd.format('YYYY-MM-DD')
    },
    competitorChanges: await getWeeklyCompetitorChanges(),
    rankingChanges: await getWeeklyRankingChanges(),
    systemMetrics: await getSystemMetrics(),
    dataUsage: await getDataUsage(),
    summary: {
      totalChanges: 0,
      criticalAlerts: 0,
      competitorsMonitored: competitors.length
    }
  };

  // Calculate summary
  reportData.summary.totalChanges = 
    reportData.competitorChanges.totalChanges + 
    reportData.rankingChanges.totalChanges;

  return reportData;
}

async function getWeeklyCompetitorChanges() {
  const changes = {
    byCompetitor: {},
    totalChanges: 0,
    significantChanges: []
  };

  try {
    const competitorDir = path.join(dataDir, 'competitors');
    const files = await fs.readdir(competitorDir);
    
    // Get files from the past week
    const weekAgo = dayjs().subtract(7, 'days');
    const weekFiles = files.filter(file => {
      const match = file.match(/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})/);
      if (match) {
        const fileDate = dayjs(match[1], 'YYYY-MM-DD_HH-mm-ss');
        return fileDate.isAfter(weekAgo);
      }
      return false;
    });

    // Analyze changes for each competitor
    for (const competitor of competitors) {
      const competitorFiles = weekFiles.filter(f => f.startsWith(competitor.id));
      const competitorChanges = [];

      // Compare sequential files
      for (let i = 1; i < competitorFiles.length; i++) {
        const prevFile = JSON.parse(
          await fs.readFile(path.join(competitorDir, competitorFiles[i-1]), 'utf8')
        );
        const currFile = JSON.parse(
          await fs.readFile(path.join(competitorDir, competitorFiles[i]), 'utf8')
        );

        if (currFile.changes && currFile.changes.length > 0) {
          competitorChanges.push(...currFile.changes);
        }
      }

      if (competitorChanges.length > 0) {
        changes.byCompetitor[competitor.name] = competitorChanges;
        changes.totalChanges += competitorChanges.length;
        
        // Find significant changes
        const significant = competitorChanges.filter(c => 
          c.type === 'pricing_change' || c.priority === 'high'
        );
        if (significant.length > 0) {
          changes.significantChanges.push({
            competitor: competitor.name,
            changes: significant
          });
        }
      }
    }
  } catch (error) {
    console.error('Error analyzing competitor changes:', error);
  }

  return changes;
}

async function getWeeklyRankingChanges() {
  const changes = {
    improved: [],
    declined: [],
    totalChanges: 0,
    averagePosition: {}
  };

  try {
    const rankingsDir = path.join(dataDir, 'rankings');
    const historyFile = path.join(rankingsDir, 'history.json');
    
    const historyExists = await fs.access(historyFile).then(() => true).catch(() => false);
    if (historyExists) {
      const history = JSON.parse(await fs.readFile(historyFile, 'utf8'));
      
      // Analyze each keyword
      for (const [keyword, data] of Object.entries(history)) {
        if (data.positions && data.positions['WEO Media']) {
          const position = data.positions['WEO Media'];
          if (typeof position === 'number') {
            changes.averagePosition[keyword] = position;
          }
        }
      }
    }

    // Get recent ranking files to analyze changes
    const files = await fs.readdir(rankingsDir);
    const weekAgo = dayjs().subtract(7, 'days');
    
    const rankingFiles = files
      .filter(f => f.startsWith('rankings_') && f.endsWith('.json'))
      .filter(file => {
        const match = file.match(/rankings_(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})/);
        if (match) {
          const fileDate = dayjs(match[1], 'YYYY-MM-DD_HH-mm-ss');
          return fileDate.isAfter(weekAgo);
        }
        return false;
      });

    // Aggregate all changes from the week
    for (const file of rankingFiles) {
      const data = JSON.parse(await fs.readFile(path.join(rankingsDir, file), 'utf8'));
      if (data.changes) {
        data.changes.forEach(change => {
          if (change.direction === 'improved') {
            changes.improved.push(change);
          } else {
            changes.declined.push(change);
          }
          changes.totalChanges++;
        });
      }
    }
  } catch (error) {
    console.error('Error analyzing ranking changes:', error);
  }

  return changes;
}

async function getSystemMetrics() {
  const metrics = {
    checksPerformed: 0,
    alertsSent: 0,
    uptime: process.uptime(),
    lastCheck: null
  };

  try {
    // Count competitor checks
    const competitorDir = path.join(dataDir, 'competitors');
    const competitorFiles = await fs.readdir(competitorDir).catch(() => []);
    metrics.checksPerformed = competitorFiles.filter(f => f.includes('_2')).length;

    // Count alerts from history
    const alertHistory = path.join(dataDir, 'alerts', 'history.json');
    const alertExists = await fs.access(alertHistory).then(() => true).catch(() => false);
    if (alertExists) {
      const alerts = JSON.parse(await fs.readFile(alertHistory, 'utf8'));
      metrics.alertsSent = alerts.length;
    }

    // Get last check time
    if (competitorFiles.length > 0) {
      const latestFile = competitorFiles.sort().reverse()[0];
      const match = latestFile.match(/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})/);
      if (match) {
        metrics.lastCheck = dayjs(match[1], 'YYYY-MM-DD_HH-mm-ss').format('YYYY-MM-DD HH:mm:ss');
      }
    }
  } catch (error) {
    console.error('Error getting system metrics:', error);
  }

  return metrics;
}