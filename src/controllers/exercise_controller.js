'use strict'

const Boom = require('boom')

class ExerciseController {
    constructor(model) {
        this.exerciseCollection = model.exerciseCollection
    }

    fetchList(request, reply) {
        if (request.query.slug) {
            return this.fetchOneBySlug(request, reply)
        }

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

    fetchOneBySlug(request, reply) {
        const slug = request.query.slug

        this.exerciseCollection
            .getBySlug(slug)
            .then(exercise => {
                if (!exercise) {
                    reply(Boom.notFound())
                    return
                }
                reply(exercise)
            })
            .catch(err => {
                reply(err).code(500)
            })
    }
}

module.exports = ExerciseController
