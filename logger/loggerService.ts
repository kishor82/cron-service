/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger, createLogger, transport } from 'winston';
import {
  ConsoleLoggerOptions,
  FileLoggerOptions,
  ElasticLoggerOptions,
  ConsoleTransport,
  FileTransport,
  ElasticTransport,
  SentryLoggerOptions
} from './winston/transports';

export type LoggerOptions = ConsoleLoggerOptions | FileLoggerOptions | ElasticLoggerOptions | SentryLoggerOptions;
export interface LoggerConfig {
  transportOptions: LoggerOptions[];
}

export class LoggerService {
  private logger: Logger;

  constructor(private readonly config: LoggerConfig) {
    const transports: transport[] = this.getTransports();

    this.logger = createLogger({
      exitOnError: false,
      level: 'info',
      transports
    });

    this.logger.on('error', (error) => {
      console.error('Error in logger caught', error);
    });
  }

  // Log levels
  log(message: string, context?: string, metadata?: any) {
    this.logger.log('info', message, { context, ...metadata });
  }

  error(message: string, trace: string, context?: string, metadata?: any) {
    this.logger.error(message, {
      trace,
      context,
      ...metadata
    });
  }

  warn(message: string, context?: string, metadata?: any) {
    this.logger.warn(message, { context, ...metadata });
  }

  debug(message: string, context?: string, metadata?: any) {
    this.logger.debug(message, {
      context,
      ...metadata
    });
  }

  verbose(message: string, context?: string, metadata?: any) {
    this.logger.verbose(message, {
      context,
      ...metadata
    });
  }

  private getTransports() {
    const transportOptions = this.config.transportOptions;
    const transports: transport[] = [];

    transportOptions
      .filter((t) => t.enable)
      .forEach((transportOption) => {
        switch (transportOption.name) {
          case 'Console':
            const consoleTransport = new ConsoleTransport(transportOption);
            transports.push(consoleTransport.create());
            break;
          case 'File':
            const fileTransport = new FileTransport(transportOption);
            transports.push(fileTransport.create());
            break;
          case 'elastic':
            const elastic = new ElasticTransport(transportOption);
            transports.push(elastic.create());
          default:
            console.warn(`logger: Invalid transport module in file '${(transportOption as any)?.name}'`);
            break;
        }

        console.debug(`logger: Loaded winston logger transport '${transportOption.name}'`);
      });

    return transports;
  }
}
