const logger = require('../logger');

module.exports = (message) => {
  logger.info(`Cron Job: ${message}`);
};
