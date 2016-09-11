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
        Map({
            title: 'Sum of two numbers',
            spec_file: 'sum.spec.js',
            initial_code_file: 'sum.code.js'
        }),
        Map({
            title: 'Render action button',
            spec_file: 'render_action_button.spec.js',
            initial_code_file: 'render_action_button.code.js'
        }),
        Map({
            title: 'Render html element',
            spec_file: 'render_html.spec.js',
            initial_code_file: 'render_html.code.js'
        })
    ]

    const examples = fixtures.map(ex => {
        const title = ex.get('title')
        const spec_file = ex.get('spec_file')
        const initial_code_file = ex.get('initial_code_file')

        const specFullpath = path.join(__dirname, '..', 'fixtures', spec_file)
        const codeFullpath = path.join(__dirname, '..', 'fixtures', initial_code_file)
        const specCode = fs.readFileSync(specFullpath).toString()
        const initialCode = fs.readFileSync(codeFullpath).toString()

        return Exercise.create(title, specCode, initialCode)
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
