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

    getById(id) {
        const exercise = this.elements
            .filter(ex => {
                return ex.get('id') == id
            })
            .first()

        return Promise.resolve(exercise || null)
    }

    getList() {
        return Promise.resolve(this.elements)
            .then(elements => elements.map(el => el.delete('specsCode')))
    }

    count() {
        let count = this.elements.count()

        return Promise.resolve(count)
    }
}

module.exports = ExerciseCollection
