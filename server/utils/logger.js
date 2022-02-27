const { createLogger, format, transports } = require('winston')
require('winston-mongodb')

const customizePrint = (info) => {
    return `[${info.level.toUpperCase()}] - [${info.timestamp}]:${info.message}`
}


const customizeFormat = format.combine(
    format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss' }),
    format.align(),
    format.printf(customizePrint),
)


const logger = createLogger({
    transports: [
        new transports.Console({
            filename: 'logs/info.log',
            format: customizeFormat,
        }),

        new transports.File({
            level: 'info',
            filename: 'logs/info.log',
            format: customizeFormat,

        }),

        new transports.File({
            level: 'error',
            filename: 'logs/errors/error.log',
            format: customizeFormat,

        }),

        new transports.MongoDB({
            db: 'mongodb+srv://hqnam:Hqnam1711@hqnam.ja5is.mongodb.net/test',
            collection: 'logs',
            options: {
                useUnifiedTopology: true
            },
            format: format.combine(
                format.timestamp({
                    format: 'DD-MM-YYYY hh:mm:ss'
                }),
                format.json()
            )
        })

    ]
})

module.exports = { logger }