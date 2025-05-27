import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
// import open from 'open'; // Commented out - optional dependency
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const html = await readFile(path.join(__dirname, 'dashboard.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      res.writeHead(500);
      res.end('Error loading dashboard');
    }
  } else if (req.url === '/api/status') {
    // In a real implementation, this would return actual system data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'active',
      lastCheck: new Date().toISOString(),
      competitors: 4,
      alerts: 2
    }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3456;

server.listen(PORT, async () => {
  console.log(chalk.bold.cyan('\n🎯 WEO Competitive Intelligence Dashboard\n'));
  console.log(chalk.green(`✓ Dashboard running at: http://localhost:${PORT}`));
  console.log(chalk.gray('\nPress Ctrl+C to stop\n'));
  
  // Show URL to open
  console.log(chalk.yellow('👉 Open your browser to: ') + chalk.bold.cyan(`http://localhost:${PORT}`));
});