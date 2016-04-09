const bunyan = require('bunyan')
const HapiBunyanHandler = require('hapi-bunyan')
const Package = require('./../../package')

const streams = [
    {
        level: 'info',
        stream: process.stdout
    },
    {
        level: 'error',
        stream: process.stderr
    }
]

const logger = bunyan.createLogger({
    name: Package.name,
    streams: streams
})

module.exports = {
    handler: HapiBunyanHandler,
    logger: logger
}
