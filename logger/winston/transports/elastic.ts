import { transport } from 'winston';
import { BaseTransport } from '../utils/baseTransport';
import { ElasticsearchTransformer, ElasticsearchTransport, ElasticsearchTransportOptions } from 'winston-elasticsearch';
import config from 'config';

export class ElasticTransport extends BaseTransport {
  constructor(protected readonly options: ElasticLoggerOptions) {
    super();
  }

  public create(): transport {
    const transport = new ElasticsearchTransport({
      ...(this.options?.options || {}),
      retryLimit: 5,
      transformer: (logData) => {
        const transformed = ElasticsearchTransformer(logData);

        if (typeof transformed.fields === 'object') {
          (transformed.fields as any).serviceName = config.get('name');
        }

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
