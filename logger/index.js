const { format, transports, createLogger } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const apm = require('elastic-apm-node');
const { ElasticsearchTransport, ElasticsearchTransformer } = require('winston-elasticsearch');
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

// TODO: move this to seperate file
const apmAgent = apm.start({
  serviceName: config.get('name'),
  secretToken: '',
  // process.env.ELASTIC_APM_SECRET_TOKEN,
  serverUrl: 'http://localhost:8200',
  environment: process.env.NODE_ENV
});

apm.logger.info('APM agent started');

const esTransport = new ElasticsearchTransport({
  level: 'info',
  apm: apmAgent,
  clientOpts: {
    node: 'http://localhost:9200',
    auth: {
      // authToken:
      // add to config
      username: 'elastic',
      password: 'changeme'
    }
  },
  retryLimit: 5,
  transformer: (logData) => {
    const transformed = ElasticsearchTransformer(logData);
    // console.log('transformed', transformed);
    // Todo: modify tronsformed to allow only known keys and fixed data types
    if (typeof transformed.fields === 'object') {
      transformed.fields.serviceName = config.get('name');
    }

    return transformed;
  },
  indexTemplate: {
    index_patterns: ['logs-*'], // Adjust the index pattern as needed

    mappings: {
      properties: {
        timestamp: { type: 'date' }, // Define the timestamp field
        level: { type: 'keyword' },
        message: { type: 'text' }, // Define the log message field
        reqBody: { type: 'text' }, // Define the log message field
        resBody: { type: 'text' }, // Define the log message field
        context: { type: 'keyword' },
        ServiceName: { type: 'keyword' }
      }
    }
  }
});

esTransport.on('error', (error) => {
  console.error('Error in logger caught', error);
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
    esTransport,
    // Conditionally add Sentry transport for production
    environment === 'production' && config.has('sentry.dsn')
      ? new Sentry({ level: 'warn', dsn: config.get('sentry.dsn') }) // Replace with your Sentry DSN
      : null
  ].filter(Boolean) // Filter out null (i.e., only add Sentry in production)
});

// Export the logger instance for use in other modules
module.exports = logger;
