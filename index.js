'use strict'

require('dotenv').load()

const debug = require('debug')('tommy-api:core')
const server = require('./src/server')
const config = require('config')

debug('Starting server')

server.start(config, (info) => {
    debug('Server running at:', info.uri)
})
