import logger from '../logger';
export default (message: string) => {
  try {
    logger.log(`Cron Job started: ${message}`);
  } catch (error) {
    logger.error('Cron Job error', '');
  } finally {
    logger.log(`Cron Job ended: ${message}`);
  }
};
