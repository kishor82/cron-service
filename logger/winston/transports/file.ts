import { transport, format } from 'winston';
import { BaseTransport } from '../utils/baseTransport';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

export class FileTransport extends BaseTransport {
  constructor(protected readonly options: FileLoggerOptions) {
    super(options);
  }

  public create(): transport {
    const { combine, timestamp, printf } = format;

    const transport = new DailyRotateFile({
      ...(this.options?.options || {}),
      format: combine(timestamp({ format: this.timestampFormat }), printf(this.getWinstonPrintf(true)))
    });

    transport.on('error', (error) => {
      console.error(`[${FileTransport.name}] Error in logger caught`, error);
    });

    return transport;
  }
}

export interface FileLoggerOptions {
  name: 'File';
  enable: boolean;
  options?: DailyRotateFileTransportOptions;
}
