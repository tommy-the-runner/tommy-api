'use strict'

const chai = require('chai')
const expect = chai.expect

const Exercise = require('../../lib/exercise')

describe('Exercise', function () {
    it('should store title and specs code', function () {
        const ex1 = Exercise.create('Sum of two numbers', 'describe("Sum")')

        expect(ex1.get('title')).to.equal('Sum of two numbers')
        expect(ex1.get('specsCode')).to.equal('describe("Sum")')
    })
})
