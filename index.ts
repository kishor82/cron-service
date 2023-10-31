import { validate, schedule } from 'node-cron';
import { resolve } from 'path';
import 'dotenv/config';

import jobs from './jobs';

const initCrons = () => {
  Object.keys(jobs).forEach((key) => {
    console.log('inside init');
    if (validate(jobs[key].frequency)) {
      // TODO: log here
      console.log('jobs[key].frequency', jobs[key].frequency);
      schedule(jobs[key].frequency, () => {
        const handler = require(resolve(__dirname, jobs[key].handler));
        console.log({ handler });
        handler(jobs[key].args);
      });
    }
  });
};

initCrons();
