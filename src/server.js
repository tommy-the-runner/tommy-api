'use strict'

const Hapi = require('hapi')
const Log = require('./utils/logs')
const Routing = require('./routes')
const vision = require('vision')
const inert = require('inert')
const lout = require('lout')

function start(config, cb) {

    const plugins = [
        vision,
        inert,
        {
            register: lout,
            options: {
                endpoint: '/docs'
            }
        },
        Routing
    ]

    if (config.get('logger.enabled')) {
        plugins.unshift({
            register: Log.handler,
            options: {
                logger: Log.logger
            }
        })
    }

    const options = {}

    const server = new Hapi.Server({
        connections: {
            router: {
                stripTrailingSlash: true
            },
        },
        app: {
            config: config
        }
    })

    server.connection({
        host: config.server.host,
        port: config.server.port,
        routes: {
            cors: true
        }
    })

    Promise.resolve()
        .then(() => {
        return server.register(plugins, options)
    })
    .then(() => server.start())
    .then(() => cb(server.info))
    .catch(err => {
        console.log('server start error: ', err)
        console.log(err.stack)
    })

    return server
}

module.exports = {
    start
}
