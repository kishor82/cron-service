const { format, transports, createLogger } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const Sentry = require("winston-sentry");
const { combine, timestamp, prettyPrint, json } = format;

// Determine the environment (e.g., 'production' or 'development')
const environment = process.env.NODE_ENV || "development";

const DailyRotateFileTransport = new DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  dirname: "logs",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

// Create a logger instance
const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // Add colors to console output
        format.simple(), // Use a simple format for console logs
      ),
    }),
    DailyRotateFileTransport,
    // Conditionally add Sentry transport for production
    environment === "production"
      ? new Sentry({ level: "warn", dsn: "YOUR_SENTRY_DSN" }) // Replace with your Sentry DSN
      : null,
  ].filter(Boolean), // Filter out null (i.e., only add Sentry in production)
});

// Export the logger instance for use in other modules
module.exports = logger;
