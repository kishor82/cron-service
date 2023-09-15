# Cron Service Documentation

This documentation explains how the cron service works and how to set it up.

## Overview

The cron service is designed to run scheduled tasks using the `node-cron` library. It reads job definitions from the `jobs.js` file and executes them based on their specified frequency.

## Files

### `index.js`

The main entry point of the cron service. It initializes the cron jobs defined in the `jobs.js` file.

### `jobs.js`

This file contains job definitions, including the frequency, handler, and arguments for each job.

Example:

```javascript
module.exports = {
  EVERY_MINUTE_CRON: {
    frequency: '1 * * * * *', // Evey minute
    handler: 'handlers/commonCronHandler',
    args: 'This is a minute-by-minute task.'
  }
};
```

### `handlers/`

This directory contains handler functions that are executed when a job runs. Each handler is associated with a job in the `jobs.js` file.

Example handler (`handlers/commonCronHandler.js`):

```
module.exports = (message) => {
    console.log(message);
};
```

## Usage

1. Install dependencies:
   `	yarn OR npm install
`
2. Start the cron service:
   `	npm start OR yarn start
`

## Customizing Jobs

To customize or add new jobs, edit the `jobs.js` file with your desired job definitions.

## Additional Resources

- You can learn more about cron expressions and create your own using [crontab.guru](https://crontab.guru/).
