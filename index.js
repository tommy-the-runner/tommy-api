'use strict'

require('dotenv').load()

const debug = require('debug')('tommy-api:core')

const config = require('config')
const plugins = require('./src/plugins')(config)
const server = require('./src/server')(config)

const registerStatsdPlugin = () => {
    const hapiStatsdConfig = {
        host: config.get('statsd.host'),
        port: config.get('statsd.port'),
        prefix: config.get('statsd.prefix')
    }

    server.register({ register: require('hapi-statsd'), options: hapiStatsdConfig })
}

Promise.resolve()
    .then(() => debug('Starting server'))
    .then(() => {
        if (config.get('statsd.enabled')) {
            return registerStatsdPlugin()
        }
    })
    .then(() => server.register(plugins.list, plugins.options))
    .then(() => server.start())
    .then(() => debug('Server running at:', server.info.uri))
    .catch(err => {
        console.log('server start error: ', err)
        console.log(err.stack)
    })
