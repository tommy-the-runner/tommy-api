'use strict'

const Log = require('./utils/logs')
const routing = require('./routes')
const model = require('./model')
const vision = require('vision')
const inert = require('inert')
const lout = require('lout')

function getPlugins(config) {
    const plugins = [
        vision,
        inert,
        {
            register: lout,
            options: {
                endpoint: '/docs'
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
