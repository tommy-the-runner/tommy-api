'use strict'

const config = require('config')
const Map = require('immutable').Map
const fs = require('fs')
const path = require('path')
const debug = require('debug')('tommy-api:core')
const Exercise = require('../lib/exercise')
const ExerciseCollection = require('../lib/exercise_collection')

function seedExamples(collection) {
    const fixtures = [
        Map({ title: 'Sum of two numbers', file: 'sum.spec.js' }),
        Map({ title: 'Multiplication of two numbers', file: 'multiplication.spec.js' })
    ]

    const examples = fixtures.map(ex => {
        const title = ex.get('title')
        const file = ex.get('file')
        const fullpath = path.join(__dirname, '..', 'fixtures', file)
        const code = fs.readFileSync(fullpath).toString()

        return Exercise.create(title, code)
    })

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
