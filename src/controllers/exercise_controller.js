'use strict'

class ExerciseController {
    constructor(model) {
        this.exerciseCollection = model.exerciseCollection
    }

    fetchList(request, reply) {
        const jobs = [
            this.exerciseCollection.count(),
            this.exerciseCollection.getList()
        ]

        Promise.all(jobs)
            .then(results => {
                const count = results[0]
                const list = results[1]

                reply({
                    totalCount: count,
                    data: list
                })
            })
    }

    fetchOne(request, reply) {
        const id = request.params.id

        this.exerciseCollection
            .getById(id)
            .then(exercise => {
                reply(exercise)
            })
            .catch(err => {
                reply(err).code(500)
            })
    }
}

module.exports = ExerciseController
