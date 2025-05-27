import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';
import { DashboardAPI } from './src/api/dashboard-api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Start the API server
const api = new DashboardAPI(3457);
await api.start();

// Start the dashboard web server
const dashboardServer = createServer(async (req, res) => {
  try {
    let filePath;
    
    if (req.url === '/' || req.url === '/live') {
      filePath = path.join(__dirname, 'dashboard-live.html');
    } else if (req.url === '/basic') {
      filePath = path.join(__dirname, 'dashboard.html');
    } else {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    
    const html = await readFile(filePath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } catch (error) {
    res.writeHead(500);
    res.end('Error loading dashboard');
  }
});

const PORT = 3456;

dashboardServer.listen(PORT, () => {
  console.log(chalk.bold.cyan('\n🎯 WEO Competitive Intelligence Dashboard\n'));
  console.log(chalk.green('✓ Dashboard running at:'));
  console.log(chalk.yellow('  Basic view: ') + chalk.bold.cyan(`http://localhost:${PORT}/basic`));
  console.log(chalk.yellow('  Live view:  ') + chalk.bold.cyan(`http://localhost:${PORT}/`));
  console.log(chalk.gray('\n✓ API running at: http://localhost:3457'));
  console.log(chalk.gray('\nPress Ctrl+C to stop\n'));
});

// Handle shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\nShutting down...'));
  api.stop();
  dashboardServer.close();
  process.exit(0);
});