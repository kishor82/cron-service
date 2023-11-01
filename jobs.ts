interface CronJob {
  frequency: string;
  handler: string;
  args: string;
}

const cronJobs: Record<string, CronJob> = {
  EVERY_MINUTE_CRON: {
    frequency: '1 * * * * *', // Every minute
    handler: 'handlers/commonCronHandler',
    args: 'This is a minute-by-minute task.'
  },
  DAILY_CRON: {
    frequency: '0 0 * * *', // Every day at midnight
    handler: 'handlers/commonCronHandler',
    args: 'Good morning!'
  },
  MONTHLY_CRON: {
    frequency: '0 0 1 * *', // First day of every month at midnight
    handler: 'handlers/commonCronHandler',
    args: 'Happy new month!'
  },
  CUSTOM_DATE_CRON: {
    frequency: '0 0 15 3 *', // 15th of March at midnight
    handler: 'handlers/commonCronHandler',
    args: "It's a special day!"
  }
};

export default cronJobs;
