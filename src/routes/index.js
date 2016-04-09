'use strict'

function setupRouting(server, options, next) {

    let routes = [
        require('./excercises')
    ]

    server.register(routes, {}, (err) => {

        if (err) {
            next(err)
            return
        }

        next()
    })

    next()
}

exports.register = setupRouting
exports.register.attributes = {
    name: 'routes',
    version: '1.0.0',
    dependency: []
}
