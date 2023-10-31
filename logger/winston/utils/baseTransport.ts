import config from 'config';
import { transport } from 'winston';
import { TransformableInfo } from 'logform';

export abstract class BaseTransport {
  protected transport: transport;

  protected timestampFormat = 'YYYY-MM-DD HH:mm:ss';
  constructor() {
    this.transport = this.create();
  }

  // must be implemented by child class
  public abstract create(): transport;

  protected get() {
    return this.transport;
  }

  protected getWinstonPrintf(enableColour = false) {
    const appName = config.get('name');
    let colorizeTimestamp = '';
    let resetColor = '';

    if (enableColour) {
      colorizeTimestamp = '\x1b[35m'; // Magenta
      resetColor = '\x1b[0m'; // Reset color
    }

    return ({ timestamp, level, message, context, trace, ...metadata }: TransformableInfo) => {
      let logMessage = `[${appName} ${colorizeTimestamp}${timestamp} ${resetColor} [${level}]]`;
      if (context) logMessage += ` [${context}]`;
      logMessage += ` - ${message}`;
      if (trace) logMessage += ` Trace: ${trace}`;

      if (metadata && Object.keys(metadata).length > 0) {
        logMessage += ` ${JSON.stringify(metadata, null, 1).replace(/\n/g, ' ')}`;
      }
      return logMessage;
    };
  }
}
