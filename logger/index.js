const { format, transports, createLogger } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const Sentry = require('winston-sentry');
const config = require('config');

const { combine, timestamp, prettyPrint, json } = format;

// Determine the environment (e.g., 'production' or 'development')
const environment = process.env.NODE_ENV || 'development';

const DailyRotateFileTransport = new DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  dirname: 'logs',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

// Create a logger instance
const logger = createLogger({
  level: config.get('logger.level') || 'info',
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // Add colors to console output
        format.simple() // Use a simple format for console logs
      )
    }),
    DailyRotateFileTransport,
    // Conditionally add Sentry transport for production
    environment === 'production' && config.has('sentry.dsn')
      ? new Sentry({ level: 'warn', dsn: config.get('sentry.dsn') }) // Replace with your Sentry DSN
      : null
  ].filter(Boolean) // Filter out null (i.e., only add Sentry in production)
});

// Export the logger instance for use in other modules
module.exports = logger;
