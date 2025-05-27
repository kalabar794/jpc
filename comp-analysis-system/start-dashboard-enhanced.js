import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';
import { DashboardAPI } from './src/api/dashboard-api-enhanced.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const API_PORT = 3457;
const DASHBOARD_PORT = 3456;

// Start the enhanced API server
const api = new DashboardAPI(API_PORT);
await api.start();

// Start the dashboard web server
const dashboardServer = createServer(async (req, res) => {
  try {
    let filePath = path.join(__dirname);
    
    // Route handling
    if (req.url === '/' || req.url === '/dashboard') {
      filePath = path.join(filePath, 'dashboard-enhanced.html');
    } else if (req.url === '/basic') {
      filePath = path.join(filePath, 'dashboard.html');
    } else if (req.url === '/live') {
      filePath = path.join(filePath, 'dashboard-live.html');
    } else if (req.url === '/matrix') {
      filePath = path.join(filePath, 'competitor-matrix-fixed.html');
    } else if (req.url.startsWith('/screenshots/')) {
      // Serve screenshots
      filePath = path.join(__dirname, 'data', req.url);
    } else {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    
    // Detect content type
    let contentType = 'text/html';
    if (filePath.endsWith('.png')) contentType = 'image/png';
    if (filePath.endsWith('.jpg')) contentType = 'image/jpeg';
    if (filePath.endsWith('.json')) contentType = 'application/json';
    
    const content = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500);
    res.end('Error loading resource');
  }
});

// Start the server
dashboardServer.listen(DASHBOARD_PORT, () => {
  console.log(chalk.cyan(`\n🎯 WEO Competitive Intelligence Dashboard\n`));
  console.log(chalk.green(`✓ Enhanced Dashboard running at:`));
  console.log(chalk.white(`  http://localhost:${DASHBOARD_PORT}/\n`));
  console.log(chalk.green(`✓ API running at: http://localhost:${API_PORT}\n`));
  
  console.log(chalk.yellow('Available views:'));
  console.log(chalk.gray(`  Enhanced: http://localhost:${DASHBOARD_PORT}/`));
  console.log(chalk.gray(`  Live:     http://localhost:${DASHBOARD_PORT}/live`));
  console.log(chalk.gray(`  Basic:    http://localhost:${DASHBOARD_PORT}/basic\n`));
  
  console.log(chalk.gray('Press Ctrl+C to stop'));
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\nShutting down gracefully...'));
  api.stop();
  dashboardServer.close(() => {
    console.log(chalk.green('✓ Servers stopped'));
    process.exit(0);
  });
});

// Handle errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red('Uncaught Exception:'), error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('Unhandled Rejection at:'), promise, chalk.red('reason:'), reason);
  process.exit(1);
});