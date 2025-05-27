import chalk from 'chalk';
import { format } from 'date-fns';

export function displaySystemStatus() {
  console.clear();
  console.log(chalk.bold.cyan(`
╔══════════════════════════════════════════════════════════════════╗
║          🔍 WEO COMPETITIVE INTELLIGENCE SYSTEM                   ║
╚══════════════════════════════════════════════════════════════════╝
`));
}

export function displayMonitoringProgress(competitor, step, total) {
  const progress = Math.round((step / total) * 100);
  const filled = Math.round(progress / 5);
  const empty = 20 - filled;
  const progressBar = '█'.repeat(filled) + '░'.repeat(empty);
  
  console.log(chalk.blue(`
┌─ ${competitor} ─────────────────────────────────┐
│ Progress: [${progressBar}] ${progress}%         │
└──────────────────────────────────────────────────┘
  `));
}

export function displayCompetitorResults(results) {
  console.log(chalk.bold.green('\n📊 Monitoring Results:\n'));
  
  results.forEach(result => {
    const status = result.error ? '❌' : result.changes?.length > 0 ? '⚠️' : '✅';
    const statusText = result.error ? 'Error' : result.changes?.length > 0 ? `${result.changes.length} Changes` : 'No Changes';
    
    console.log(chalk.white(`
┌─ ${result.competitor} ${status}
│ Status: ${statusText}
│ Checked: ${format(new Date(result.timestamp), 'HH:mm:ss')}
│ Pages: ${Object.keys(result.pages || {}).length} monitored
└─────────────────────────────────────────
    `));
    
    if (result.changes && result.changes.length > 0) {
      console.log(chalk.yellow('  Changes Detected:'));
      result.changes.forEach(change => {
        console.log(chalk.yellow(`    • ${change.type}: ${change.page}`));
      });
    }
  });
}

export function displayRankingResults(rankings) {
  console.log(chalk.bold.green('\n📈 Ranking Results:\n'));
  
  Object.entries(rankings.rankings).forEach(([keyword, data]) => {
    if (!data.error) {
      const weoPos = data.positions['WEO Media'];
      const positionText = typeof weoPos === 'number' ? `#${weoPos}` : weoPos;
      const indicator = typeof weoPos === 'number' && weoPos <= 10 ? '🎯' : '📍';
      
      console.log(chalk.white(`
${indicator} "${keyword}"
   WEO Media: ${positionText}
   Top Competitor: ${data.topCompetitors[0]?.name || 'None'} (#${data.topCompetitors[0]?.position || 'N/A'})
      `));
    }
  });
}

export function displayEmailStatus(sent, recipient) {
  if (sent) {
    console.log(chalk.green(`
✉️  Email Alert Sent Successfully!
   To: ${recipient}
   Time: ${format(new Date(), 'HH:mm:ss')}
    `));
  }
}

export function displayScheduleInfo() {
  console.log(chalk.gray(`
📅 Schedule Information:
   • Competitor Checks: Every 6 hours
   • Ranking Checks: Daily at 2:00 AM
   • Weekly Reports: Mondays at 9:00 AM
   • Next Check: ${format(new Date(Date.now() + 6 * 60 * 60 * 1000), 'HH:mm')}
  `));
}

export function displayLiveMonitoring() {
  let dots = 0;
  const interval = setInterval(() => {
    const dotString = '.'.repeat(dots % 4);
    process.stdout.write(`\r${chalk.cyan('🔍 Monitoring in progress')}${dotString}    `);
    dots++;
  }, 500);
  
  return () => clearInterval(interval);
}