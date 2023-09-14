module.exports = {
    MY_CRON: {
        frequency: '1 * * * * *', // 7 AM
        handler: 'handlers/my_cron',
        args: 'hello world!'
    }
}

