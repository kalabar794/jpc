import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDir = path.join(__dirname, '../../data/logs');

// Custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let output = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      output += ` ${JSON.stringify(meta)}`;
    }
    return output;
  })
);

// Custom format for file output
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    // Console transport
    new winston.transports.Console({
      format: consoleFormat
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // File transport for errors only
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

// Log categories for better organization
export const logCategories = {
  COMPETITOR: 'competitor-monitor',
  RANKING: 'ranking-tracker',
  PERFORMANCE: 'performance-monitor',
  ALERT: 'alert-manager',
  EMAIL: 'email-service',
  SYSTEM: 'system',
  ERROR: 'error'
};

// Helper functions for structured logging
export const logCompetitorCheck = (competitor, data) => {
  logger.info('Competitor check completed', {
    category: logCategories.COMPETITOR,
    competitor: competitor.name,
    url: competitor.domain,
    ...data
  });
};

export const logRankingCheck = (keyword, results) => {
  logger.info('Ranking check completed', {
    category: logCategories.RANKING,
    keyword,
    ...results
  });
};

export const logAlert = (type, message, data) => {
  const level = type === 'critical' ? 'error' : type === 'warning' ? 'warn' : 'info';
  logger.log(level, message, {
    category: logCategories.ALERT,
    alertType: type,
    ...data
  });
};

export const logEmail = (status, recipient, subject) => {
  logger.info('Email sent', {
    category: logCategories.EMAIL,
    status,
    recipient,
    subject
  });
};

export const logError = (error, context) => {
  logger.error(error.message, {
    category: logCategories.ERROR,
    context,
    stack: error.stack
  });
};

export const logSystem = (message, data = {}) => {
  logger.info(message, {
    category: logCategories.SYSTEM,
    ...data
  });
};

export default logger;