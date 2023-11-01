import apm from 'elastic-apm-node';
import { name } from '../package.json';

export const apmAgent = apm.start({
  serviceName: name,
  secretToken: '',
  // process.env.ELASTIC_APM_SECRET_TOKEN,
  serverUrl: 'http://localhost:8200',
  environment: process.env.NODE_ENV
});

apm.logger.info('APM agent started');
