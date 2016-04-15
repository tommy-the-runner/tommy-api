'use strict'

const Immutable = require('immutable')

class ExerciseCollection {
    constructor() {
        this.elements = Immutable.List()
    }

    add(exercise) {
        this.elements = this.elements.push(exercise)

        return Promise.resolve(exercise)
    }

    getElements() {
        return Promise.resolve(this.elements)
    }

    count() {
        let count = this.elements.count()

        return Promise.resolve(count)
    }
}

module.exports = ExerciseCollection
