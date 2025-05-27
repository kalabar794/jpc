import { createServer } from 'http';
import { readFile, readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

export class DashboardAPI {
  constructor(port = 3457) {
    this.port = port;
    this.server = null;
  }

  async start() {
    this.server = createServer(async (req, res) => {
      // Enable CORS
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Content-Type', 'application/json');

      try {
        if (req.url === '/api/status') {
          const status = await this.getSystemStatus();
          res.writeHead(200);
          res.end(JSON.stringify(status));
        } else if (req.url === '/api/competitors') {
          const competitors = await this.getCompetitorData();
          res.writeHead(200);
          res.end(JSON.stringify(competitors));
        } else if (req.url === '/api/rankings') {
          const rankings = await this.getRankingData();
          res.writeHead(200);
          res.end(JSON.stringify(rankings));
        } else if (req.url === '/api/activity') {
          const activity = await this.getActivityLog();
          res.writeHead(200);
          res.end(JSON.stringify(activity));
        } else if (req.url === '/api/screenshots') {
          const screenshots = await this.getScreenshots();
          res.writeHead(200);
          res.end(JSON.stringify(screenshots));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Not found' }));
        }
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
      }
    });

    this.server.listen(this.port, () => {
      console.log(chalk.green(`✓ Dashboard API running on port ${this.port}`));
    });
  }

  async getSystemStatus() {
    try {
      // Check for latest monitoring data
      const competitorFiles = await readdir(path.join(dataDir, 'competitors')).catch(() => []);
      const latestCheck = competitorFiles
        .filter(f => f.includes('_2'))
        .sort()
        .reverse()[0];
      
      const lastCheckTime = latestCheck ? 
        latestCheck.match(/(\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2})/)?.[1] : null;

      // Count alerts
      const alertHistory = await readFile(path.join(dataDir, 'alerts', 'history.json'), 'utf8')
        .then(data => JSON.parse(data))
        .catch(() => []);
      
      const today = new Date().toDateString();
      const alertsToday = alertHistory.filter(a => 
        new Date(a.timestamp).toDateString() === today
      ).length;

      return {
        status: 'active',
        lastCheck: lastCheckTime ? new Date(lastCheckTime.replace(/_/g, ' ')) : null,
        nextCheck: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
        competitors: 4,
        keywords: 50,
        alertsToday,
        emailStatus: 'connected'
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }

  async getCompetitorData() {
    try {
      const competitors = [];
      const competitorIds = ['prosites', 'smileshop', 'gpm', 'roadside'];
      
      for (const id of competitorIds) {
        const latestFile = path.join(dataDir, 'competitors', `${id}_latest.json`);
        try {
          const data = await readFile(latestFile, 'utf8');
          const parsed = JSON.parse(data);
          competitors.push({
            id,
            name: parsed.competitor,
            lastCheck: parsed.timestamp,
            changes: parsed.changes || [],
            data: parsed.pages
          });
        } catch (error) {
          // No data yet for this competitor
        }
      }
      
      return competitors;
    } catch (error) {
      return [];
    }
  }

  async getRankingData() {
    try {
      const historyFile = path.join(dataDir, 'rankings', 'history.json');
      const history = await readFile(historyFile, 'utf8')
        .then(data => JSON.parse(data))
        .catch(() => ({}));
      
      const rankings = [];
      for (const [keyword, data] of Object.entries(history)) {
        if (data.positions) {
          rankings.push({
            keyword,
            weoPosition: data.positions['WEO Media'] || 'Not ranked',
            topCompetitor: data.topCompetitors?.[0] || null,
            lastCheck: data.checkedAt
          });
        }
      }
      
      return rankings.slice(0, 10); // Top 10 keywords
    } catch (error) {
      return [];
    }
  }

  async getActivityLog() {
    try {
      const logs = [];
      
      // Read combined log
      const logFile = path.join(dataDir, 'logs', 'combined.log');
      const logContent = await readFile(logFile, 'utf8').catch(() => '');
      
      const lines = logContent.split('\n').filter(line => line);
      const recentLogs = lines.slice(-20).reverse(); // Last 20 entries
      
      recentLogs.forEach(line => {
        try {
          const parsed = JSON.parse(line);
          logs.push({
            timestamp: parsed.timestamp,
            level: parsed.level,
            message: parsed.message,
            category: parsed.category
          });
        } catch (e) {
          // Skip malformed lines
        }
      });
      
      return logs;
    } catch (error) {
      return [];
    }
  }

  async getScreenshots() {
    try {
      const screenshotDir = path.join(dataDir, 'screenshots');
      const files = await readdir(screenshotDir).catch(() => []);
      
      const screenshots = files
        .filter(f => f.endsWith('.jpg') || f.endsWith('.png'))
        .sort()
        .reverse()
        .slice(0, 8) // Latest 8 screenshots
        .map(filename => {
          const parts = filename.split('_');
          return {
            filename,
            competitor: parts[0],
            page: parts[1],
            timestamp: parts.slice(2).join('_').replace(/\.(jpg|png)$/, '')
          };
        });
      
      return screenshots;
    } catch (error) {
      return [];
    }
  }

  stop() {
    if (this.server) {
      this.server.close();
      console.log(chalk.yellow('Dashboard API stopped'));
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const api = new DashboardAPI();
  api.start();
}