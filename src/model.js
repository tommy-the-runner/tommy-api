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
            spec_file_editable: false,
            initial_code_file: 'render_action_button.code.js'
        }),
        Map({
            title: 'Render html element',
            spec_file: 'render_html.spec.js',
            spec_file_editable: false,
            initial_code_file: 'render_html.code.js',
            initial_code_file_editable: false
        }),
        Map({
            title: 'Mocha + Chai + Sinon',
            spec_file: 'util.spec.js',
            initial_code_file: 'util.code.js'
        }),
        Map({
            title: 'The structure - basic example',
            spec_file: 'structure/basic.spec.js',
            initial_code_file: 'structure/basic.code.js'
        }),
        Map({
            title: 'The structure -  blocks example',
            spec_file: 'structure/blocks.spec.js',
            initial_code_file: 'structure/blocks.code.js'
        })
    ]

    const loadFixture = (filename) => {
        const filepath = path.join(__dirname, '..', 'fixtures', filename)
        return fs.readFileSync(filepath).toString()
    }

    const examples = fixtures.map(ex => {
        const title = ex.get('title')
        const spec_file = ex.get('spec_file')
        const initial_code_file = ex.get('initial_code_file')

        const specCode = loadFixture(spec_file)
        const initialCode = loadFixture(initial_code_file)

        let exercise = Exercise.create(title, specCode, initialCode)

        if (ex.get('spec_file_editable') === false) {
            exercise = exercise.set('specsCodeEditable', false)
        }

        if (ex.get('initial_code_file_editable') === false) {
            exercise = exercise.set('initialCodeEditable', false)
        }

        return exercise
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
