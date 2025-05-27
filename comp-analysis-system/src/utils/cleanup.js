import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';
import { logSystem, logError } from './logger.js';
import { formatBytes } from './helpers.js';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

export async function cleanupOldData() {
  console.log(chalk.bold.cyan('🧹 Starting data cleanup...\n'));
  
  const keepScreenshotsDays = parseInt(process.env.KEEP_SCREENSHOTS_DAYS) || 30;
  const keepRankingsDays = parseInt(process.env.KEEP_RANKINGS_DAYS) || 90;
  const keepLogsDays = parseInt(process.env.KEEP_LOGS_DAYS) || 7;

  let totalDeleted = 0;
  let totalSpaceSaved = 0;

  // Cleanup screenshots
  const screenshotStats = await cleanupDirectory(
    path.join(dataDir, 'screenshots'),
    keepScreenshotsDays,
    ['.jpg', '.png']
  );
  totalDeleted += screenshotStats.deleted;
  totalSpaceSaved += screenshotStats.spaceSaved;

  // Cleanup old ranking data
  const rankingStats = await cleanupDirectory(
    path.join(dataDir, 'rankings'),
    keepRankingsDays,
    ['.json'],
    ['history.json'] // Keep history file
  );
  totalDeleted += rankingStats.deleted;
  totalSpaceSaved += rankingStats.spaceSaved;

  // Cleanup old logs
  const logStats = await cleanupDirectory(
    path.join(dataDir, 'logs'),
    keepLogsDays,
    ['.log']
  );
  totalDeleted += logStats.deleted;
  totalSpaceSaved += logStats.spaceSaved;

  // Cleanup old competitor data (keep latest only)
  const competitorStats = await cleanupCompetitorData();
  totalDeleted += competitorStats.deleted;
  totalSpaceSaved += competitorStats.spaceSaved;

  console.log(chalk.green(`\n✓ Cleanup complete!`));
  console.log(chalk.gray(`  Files deleted: ${totalDeleted}`));
  console.log(chalk.gray(`  Space saved: ${formatBytes(totalSpaceSaved)}\n`));

  logSystem('Data cleanup completed', {
    filesDeleted: totalDeleted,
    spaceSaved: formatBytes(totalSpaceSaved)
  });
}

async function cleanupDirectory(dirPath, keepDays, extensions = [], excludeFiles = []) {
  let deleted = 0;
  let spaceSaved = 0;

  try {
    const files = await fs.readdir(dirPath);
    const cutoffDate = dayjs().subtract(keepDays, 'days');

    for (const file of files) {
      // Skip excluded files
      if (excludeFiles.includes(file)) continue;

      // Check extension if specified
      if (extensions.length > 0) {
        const hasValidExtension = extensions.some(ext => file.endsWith(ext));
        if (!hasValidExtension) continue;
      }

      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        const fileDate = dayjs(stats.mtime);
        
        if (fileDate.isBefore(cutoffDate)) {
          spaceSaved += stats.size;
          await fs.unlink(filePath);
          deleted++;
          console.log(chalk.gray(`  Deleted: ${file} (${formatBytes(stats.size)})`));
        }
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      logError(error, `Cleanup failed for ${dirPath}`);
    }
  }

  return { deleted, spaceSaved };
}

async function cleanupCompetitorData() {
  let deleted = 0;
  let spaceSaved = 0;

  try {
    const competitorDir = path.join(dataDir, 'competitors');
    const files = await fs.readdir(competitorDir);

    // Group files by competitor
    const filesByCompetitor = {};
    
    for (const file of files) {
      if (file.endsWith('_latest.json')) continue; // Skip latest files
      
      const match = file.match(/^(.+?)_\d{4}-\d{2}-\d{2}/);
      if (match) {
        const competitor = match[1];
        if (!filesByCompetitor[competitor]) {
          filesByCompetitor[competitor] = [];
        }
        filesByCompetitor[competitor].push(file);
      }
    }

    // Keep only the 5 most recent files per competitor
    for (const [competitor, competitorFiles] of Object.entries(filesByCompetitor)) {
      const sortedFiles = competitorFiles.sort().reverse();
      const filesToDelete = sortedFiles.slice(5); // Keep 5 most recent

      for (const file of filesToDelete) {
        const filePath = path.join(competitorDir, file);
        const stats = await fs.stat(filePath);
        spaceSaved += stats.size;
        await fs.unlink(filePath);
        deleted++;
        console.log(chalk.gray(`  Deleted old data: ${file}`));
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      logError(error, 'Cleanup failed for competitor data');
    }
  }

  return { deleted, spaceSaved };
}

export async function getDataUsage() {
  const usage = {
    screenshots: 0,
    rankings: 0,
    competitors: 0,
    logs: 0,
    total: 0
  };

  const directories = {
    screenshots: path.join(dataDir, 'screenshots'),
    rankings: path.join(dataDir, 'rankings'),
    competitors: path.join(dataDir, 'competitors'),
    logs: path.join(dataDir, 'logs')
  };

  for (const [key, dirPath] of Object.entries(directories)) {
    try {
      const size = await getDirectorySize(dirPath);
      usage[key] = size;
      usage.total += size;
    } catch (error) {
      // Directory may not exist
    }
  }

  return usage;
}

async function getDirectorySize(dirPath) {
  let totalSize = 0;

  try {
    const files = await fs.readdir(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isFile()) {
        totalSize += stats.size;
      } else if (stats.isDirectory()) {
        totalSize += await getDirectorySize(filePath);
      }
    }
  } catch (error) {
    // Directory may not exist
  }

  return totalSize;
}