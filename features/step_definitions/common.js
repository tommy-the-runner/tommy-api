'use strict'

const chai = require('chai')
const expect = chai.expect

module.exports = function () {
    this.Given(/^I am the API client$/, function () {})

    this.Given(/^there is exercise "([^"]*)" with specs as in "([^"]*)"$/, function (title, filename) {
        return this.addExercise({
            title: title,
            specsCode: filename
        })
    })

    this.When(/^I request for list of exercises$/, function () {
        return this.getExercises()
    })

    this.Then(/^I should see number of total exercises equal "([^"]*)"$/, function (total) {
        const body = this.getLastResponseBody()

        const expectedTotalCount = parseInt(total, 10)

        expect(body.totalCount).to.equal(expectedTotalCount)
    })

    this.Then(/^I should see exercices "([^"]*)"$/, function (title) {
        const body = this.getLastResponseBody()

        const data = body.data

        const result = data.filter(exercise => {
            return exercise.title == title
        })

        expect(result).to.have.length.above(0)
    })
}
