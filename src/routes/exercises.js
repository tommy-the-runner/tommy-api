'use strict'

const joi = require('joi')
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
                validate: {
                    query: {
                        slug: joi.string()
                    }
                },
                handler: controller.fetchList,
                description: 'Exercise list',
                tags: ['api']
            }
        },
        {
            method: 'GET',
            path: '/v1/exercises/{id}',
            config: {
                validate: {},
                handler: controller.fetchOne,
                description: 'Exercise details',
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
