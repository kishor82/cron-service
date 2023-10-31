import { transport, transports, format } from 'winston';
import { BaseTransport } from '../utils/baseTransport';

export class ConsoleTransport extends BaseTransport {
  constructor(protected readonly options: ConsoleLoggerOptions) {
    super();
  }

  public create(): transport {
    const { combine, timestamp, colorize, printf } = format;
    const transport = new transports.Console({
      ...(this.options?.options || {}),
      format: combine(timestamp({ format: this.timestampFormat }), colorize({ all: true }), printf(this.getWinstonPrintf(true)))
    });

    return transport;
  }
}

export interface ConsoleLoggerOptions {
  name: 'Console';
  enable: boolean;
  options?: transports.ConsoleTransportOptions;
}
