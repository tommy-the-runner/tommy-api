'use strict'

class ExerciseCollection {
    add() {
        return Promise.resolve({})
    }

    getElements() {
        return Promise.resolve([])
    }

    count() {
        return Promise.resolve(0)
    }
}

module.exports = ExerciseCollection
