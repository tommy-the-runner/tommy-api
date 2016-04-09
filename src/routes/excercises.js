'use strict'

const config = require('config')

function setupRoute(server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/v1/excercises',
            config: {
                validate: {},
                handler: function (request, reply) { reply({ data: [] })},
                description: 'Excercise list',
                tags: ['api']
            }
        }
    ])

    next()
}

exports.register = setupRoute
exports.register.attributes = {
    name: 'routes-excercises',
    version: '1.0.0'
}
