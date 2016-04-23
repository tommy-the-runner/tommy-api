'use strict'

const ExerciseController = require('../controllers/exercise_controller')

function setupRoute(server, options, next) {

    const model = server.plugins.model
    const controller = new ExerciseController(model)

    server.bind(controller)
    server.route([
        {
            method: 'GET',
            path: '/v1/exercises',
            config: {
                validate: {},
                handler: controller.fetchList,
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
