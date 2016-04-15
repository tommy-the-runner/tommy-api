'use strict'

const config = require('config')
const debug = require('debug')('tommy-api:core')
const Exercise = require('../lib/exercise')
const ExerciseCollection = require('../lib/exercise_collection')

function seedExamples(collection) {
    const examples = [
        Exercise.create('Sum of two numbers', 'describe("it")'),
        Exercise.create('Multiplication of two numbers', 'describe("it")')
    ]

    const initialValue = Promise.resolve()

    return examples
        .reduce((promise, example) => {
            const title = example.get('title')
            debug(`Seeding with example: "${title}"...`)

            return promise.then(() => collection.add(example))
        }, initialValue)
}

function setupModel(server, options, next) {
    const collection = new ExerciseCollection()

    server.expose('Exercise', Exercise)
    server.expose('exerciseCollection', collection)

    if (!config.get('tommy.seed_examples')) {
        next()
        return
    }

    seedExamples(collection)
        .then(() => next())
}

exports.register = setupModel
exports.register.attributes = {
    name: 'model',
    version: '1.0.0',
    dependency: []
}
