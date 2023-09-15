module.exports = {
    MY_CRON: {
        frequency: '1 * * * * *', // Evey minute
        handler: 'handlers/my_cron',
        args: 'hello world!'
    }
}

