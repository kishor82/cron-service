const cron = require('node-cron');
const { resolve } = require('path');
require('dotenv').config();
const jobs = require('./jobs');
const logger = require('./logger');

const initCrons = () => {
  Object.keys(jobs).forEach((key) => {
    if (cron.validate(jobs[key].frequency)) {
      logger.info(`Initializing cron job: ${key}`);
      cron.schedule(jobs[key].frequency, () => {
        const handler = require(resolve(__dirname, jobs[key].handler));
        handler(jobs[key].args);
      });
    }
  });
};

initCrons();
