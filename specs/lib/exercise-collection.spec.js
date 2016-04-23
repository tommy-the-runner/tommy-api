'use strict'

const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-immutable'))
chai.use(require('chai-as-promised'))

const Exercise = require('../../lib/exercise')
const ExerciseCollection = require('../../lib/exercise_collection')

describe('Exercise collection', function () {
    let collection

    beforeEach(function () {
        collection = new ExerciseCollection()
    })

    it('should allow to add exercise with Promise', function () {
        const ex1 = Exercise.create('Sum of two numbers', 'describe("Sum")')

        return Promise.resolve()
            .then(() => expect(collection.count()).to.eventually.equal(0))
            .then(() => collection.add(ex1))
            .then(() => expect(collection.count()).to.eventually.equal(1))
    })

    describe('getElements', function () {
        it('should allow to list exercises', function () {
            const ex1 = Exercise.create('Sum of two numbers', 'describe("Sum")')
            const ex2 = Exercise.create('Multiplication of two numbers', 'describe("Multiplication")')

            const exercises = [ex1, ex2]
            const creations = exercises.map(ex => collection.add(ex))

            return Promise.all(creations)
                .then(() => expect(collection.getList()).to.eventually.have.size(2))
        })
    })

    describe('getById', function () {
        it('should allow to get exercise by id', function () {
            const ex1 = Exercise.create('Sum of two numbers', 'describe("Sum")')
            const ex2 = Exercise.create('Multiplication of two numbers', 'describe("Multiplication")')

            const exercises = [ex1, ex2]
            const creations = exercises.map(ex => collection.add(ex))

            const id = ex1.get('id')

            return Promise.all(creations)
                .then(() => expect(collection.getById(id)).to.eventually.equal(ex1))
        })

        it('should resolve with null when not found', function () {
            return expect(collection.getById('123')).to.eventually.be.null
        })
    })
})
