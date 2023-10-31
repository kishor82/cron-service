import { transport, transports, format } from 'winston';
import { BaseTransport } from '../utils/baseTransport';
import Sentry from 'winston-sentry-log';

export class SentryTransport extends BaseTransport {
  constructor(protected readonly options: SentryLoggerOptions) {
    super();
  }

  public create(): transport {
    const transport = new Sentry({
      level: 'info',
      ...(this.options?.options || {})
    });

    return transport;
  }
}

export interface SentryLoggerOptions {
  name: 'Sentry';
  enable: boolean;
  options?: any;
}
