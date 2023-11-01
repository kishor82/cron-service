import { validate, schedule } from 'node-cron';
import { resolve } from 'path';
import 'dotenv/config';

import jobs from './jobs';
import logger from './logger';

const initCrons = () => {
  Object.keys(jobs).forEach((key) => {
    if (validate(jobs[key].frequency)) {
      logger.log(`Job ${key} scheduled`);
      schedule(jobs[key].frequency, async () => {
        const handlerModule = await import(resolve(__dirname, jobs[key].handler));
        const handler = handlerModule.default; // Access the default export
        try {
          handler(jobs[key].args);
        } catch (e) {
          console.error(e);
        }
      });
    }
  });
};

initCrons();
