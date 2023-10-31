import config from 'config';
import { apmAgent } from './apm';
import { LoggerService } from './logger.service';

export class Logger {
  private static instance: Logger | null = null;
  private loggerService: LoggerService;

  private constructor() {
    // Determine the environment (e.g., 'production' or 'development')
    const environment = process.env.NODE_ENV || 'development';

    this.loggerService = new LoggerService({
      transportOptions: [
        {
          name: 'Console',
          options: {
            level: 'info'
          },
          enable: true
        },
        {
          name: 'File',
          options: {
            level: 'info',
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
          },
          enable: true
        },
        {
          name: 'elastic',
          enable: true,
          options: {
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
            }
          }
        },
        {
          name: 'Sentry',
          options: {
            config: {
              dsn: 'https://******@sentry.io/12345'
            },
            level: 'info'
          },
          enable: environment === 'production' && config.has('sentry.dsn')
        }
      ]
    }); // Create an instance of LoggerService
    // Additional initialization logic for the Logger class
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string) {
    // Use the LoggerService instance to log messages
    this.loggerService.log(message);
  }
}
export default Logger.getInstance();
