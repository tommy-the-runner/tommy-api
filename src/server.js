'use strict'

const Hapi = require('hapi')

function getServer(config) {
    const server = new Hapi.Server({
        connections: {
            router: {
                stripTrailingSlash: true
            }
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

    return server
}

module.exports = getServer
