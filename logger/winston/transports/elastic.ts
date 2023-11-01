import { transport } from 'winston';
import { BaseTransport } from '../utils/baseTransport';
import { ElasticsearchTransformer, ElasticsearchTransport, ElasticsearchTransportOptions } from 'winston-elasticsearch';
import { resolve } from 'path';

export class ElasticTransport extends BaseTransport {
  constructor(protected readonly options: ElasticLoggerOptions) {
    super(options);
  }

  public create(): transport {
    const transport = new ElasticsearchTransport({
      ...(this.options?.options || {}),
      apm: require(resolve(__dirname, '../../apm')),
      retryLimit: 5,
      transformer: (logData) => {
        const transformed = ElasticsearchTransformer(logData);
        return transformed;
      },
      indexTemplate: {
        index_pattrens: ['logs-*'],
        mappings: {
          properties: {
            timestamp: { type: 'date' },
            level: { type: 'keyword' },
            message: { type: 'text' },
            context: { type: 'keyword' },
            servicename: { type: 'keyword' }
          }
        }
      }
    });

    transport.on('error', (error) => {
      console.error(`[${ElasticTransport.name}] Error in logger caught`, error);
    });

    return transport;
  }
}

export interface ElasticLoggerOptions {
  name: 'elastic';
  enable: boolean;
  options?: ElasticsearchTransportOptions;
}
