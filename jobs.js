module.exports = {
  MY_CRON: {
    frequency: "1 * * * * *", // Evey minute
    handler: "handlers/myCron",
    args: "hello world!",
  },
};
