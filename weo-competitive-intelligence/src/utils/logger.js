import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const logLevel = process.env.LOG_LEVEL || 'info';
const dataDir = process.env.DATA_DIR || './data';
const logDir = path.join(dataDir, 'logs');

// Create the logger
const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'weo-intelligence' },
  transports: [
    // Error log
    new DailyRotateFile({
      filename: path.join(logDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '30d'
    }),
    
    // Combined log
    new DailyRotateFile({
      filename: path.join(logDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '60d'
    }),
    
    // Activity log for monitoring actions
    new DailyRotateFile({
      filename: path.join(logDir, 'activity-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxSize: '20m',
      maxFiles: '90d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
        })
      )
    })
  ]
});

// Console logging for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
      })
    )
  }));
}

// Specialized logging functions
export const logActivity = (action, details = {}) => {
  logger.info(`Activity: ${action}`, { type: 'activity', ...details });
};

export const logCompetitorScan = (competitor, status, details = {}) => {
  logger.info(`Competitor scan: ${competitor} - ${status}`, { 
    type: 'competitor_scan', 
    competitor, 
    status, 
    ...details 
  });
};

export const logRankingCheck = (keyword, results, details = {}) => {
  logger.info(`Ranking check: ${keyword}`, { 
    type: 'ranking_check', 
    keyword, 
    results, 
    ...details 
  });
};

export const logAlert = (level, message, details = {}) => {
  const logMethod = level === 'critical' ? 'error' : level === 'warning' ? 'warn' : 'info';
  logger[logMethod](`Alert: ${message}`, { 
    type: 'alert', 
    alertLevel: level, 
    ...details 
  });
};

export const logError = (error, context = {}) => {
  logger.error(`Error: ${error.message}`, { 
    type: 'error',
    error: error.stack,
    ...context 
  });
};

export const logPerformance = (operation, duration, details = {}) => {
  logger.info(`Performance: ${operation} took ${duration}ms`, { 
    type: 'performance', 
    operation, 
    duration, 
    ...details 
  });
};

export default logger;