# Cron Service Documentation

This documentation explains how the cron service works and how to set it up.

## Overview

The cron service is designed to run scheduled tasks using the `node-cron` library. It reads job definitions from the `jobs.ts` file and executes them based on their specified frequency.

## Files

### `index.ts`

The main entry point of the cron service. It initializes the cron jobs defined in the `jobs.ts` file.

### `jobs.ts`

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

This directory contains handler functions that are executed when a job runs. Each handler is associated with a job in the `jobs.ts` file.

Example handler (`handlers/commonCronHandler.ts`):

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

## Environment Variables

To configure your project, you can use environment variables. For local development, these variables are optional, but for production, they are required.

### Setting Up Environment Variables for Local Development

For local development, you can choose to set environment variables in an `.env` file in your project's root directory. Here's how:

1. Create a file named `.env` in your project's root directory if it doesn't already exist.

2. Open the `.env` file and add the following variables as needed:

   ```env
   # For local development, you can leave these variables empty or provide test values.
   NODE_ENV=development
   SENTRY_DSN=
   ```

### Setting Up Environment Variables for Production

For production, you must configure the following environment variables:

- `NODE_ENV`: Set this environment variable to "production" to indicate a production environment.
- `SENTRY_DSN`: Set this environment variable to your actual Sentry Data Source Name (DSN) URL. You can obtain the DSN from your Sentry project settings.

Here's how to set up these variables for production:

1. Copy the `.env.example` file to `.env`:
   `cp .env.example .env`
2. Open the `.env` file and add the following production values:

   ```env
   NODE_ENV=production
   SENTRY_DSN=your_actual_sentry_dsn_url
   ```

3. Replace `"your_actual_sentry_dsn_url"` with your real Sentry DSN URL.
4. Save the `.env` file with the production values.

These environment variables are essential for configuring your project correctly in a production environment. Make sure to keep your production `.env` file secure and never share sensitive information.
u
u

## Customizing Jobs

To customize or add new jobs, edit the `jobs.ts` file with your desired job definitions.

## Additional Resources

- You can learn more about cron expressions and create your own using [crontab.guru](https://crontab.guru/).
