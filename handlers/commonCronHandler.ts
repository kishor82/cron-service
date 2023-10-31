import logger from '../logger';
export default (message: string) => {
  logger.log(`Cron Job: ${message}`);
};
