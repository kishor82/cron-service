import { transport, transports, format } from 'winston';
import { BaseTransport } from '../utils/baseTransport';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

export class FileTransport extends BaseTransport {
  constructor(protected readonly options: FileLoggerOptions) {
    super();
  }

  public create(): transport {
    const { combine, timestamp, colorize, printf } = format;
    const transport = new DailyRotateFile({
      ...(this.options?.options || {}),
      format: combine(timestamp({ format: this.timestampFormat }), printf(this.getWinstonPrintf(true)))
    });

    return transport;
  }
}

export interface FileLoggerOptions {
  name: 'File';
  enable: boolean;
  options?: DailyRotateFileTransportOptions;
}
