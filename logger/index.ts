import config from 'config';
import { LoggerService } from './loggerService';

export class Logger extends LoggerService {
  private static instance: Logger | null = null;

  private constructor() {
    // Determine the environment (e.g., 'production' or 'development')
    const environment = process.env.NODE_ENV || 'development';

    super({
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
          enable: false,
          options: {
            level: 'info',
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
    });
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
}
export default Logger.getInstance();
