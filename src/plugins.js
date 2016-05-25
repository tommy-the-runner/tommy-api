'use strict'

const Log = require('./utils/logs')
const routing = require('./routes')
const model = require('./model')
const vision = require('vision')
const inert = require('inert')
const swaggered = require('hapi-swaggered')

function getPlugins(config) {
    const plugins = [
        vision,
        inert,
        {
            register: swaggered,
            options: {
                info: {
                    title: 'Tommy API',
                    description: 'Powered by node, hapi and joi',
                    version: '1.0'
                }
            }
        },
        model,
        routing
    ]

    if (config.logger.enabled) {
        plugins.unshift({
            register: Log.handler,
            options: {
                logger: Log.logger
            }
        })
    }

    return {
        list: plugins,
        options: {}
    }
}

module.exports = getPlugins
