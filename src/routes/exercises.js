'use strict'

const config = require('config')

function setupRoute(server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/v1/exercises',
            config: {
                validate: {},
                handler: function (request, reply) { reply({ data: [] })},
                description: 'Exercise list',
                tags: ['api']
            }
        }
    ])

    next()
}

exports.register = setupRoute
exports.register.attributes = {
    name: 'routes-exercises',
    version: '1.0.0'
}
