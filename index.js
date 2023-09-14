const cron = require('node-cron');
const { resolve } = require('path');
const jobs = require('./jobs');

const initCrons = () => {
    Object.keys(jobs).forEach((key) => {
        if (cron.validate(jobs[key].frequency)) {
            cron.schedule(jobs[key].frequency, () => {
                const handler = require(resolve(__dirname, jobs[key].handler));
                handler(jobs[key].args);
            });
        }
    });
};

initCrons();