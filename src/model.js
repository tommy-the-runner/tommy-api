'use strict'

const Exercise = require('../lib/exercise')
const ExerciseCollection = require('../lib/exercise_collection')

function setupModel(server, options, next) {
    server.expose('Exercise', Exercise)
    server.expose('exerciseCollection', new ExerciseCollection())

    next()
}

exports.register = setupModel
exports.register.attributes = {
    name: 'model',
    version: '1.0.0',
    dependency: []
}
