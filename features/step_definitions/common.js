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

    this.When(/^I request details of first item$/, function () {
        const body = this.getLastResponseBody()
        const data = body.data

        const exercise = data[0]
        const id = exercise.id

        return this.getExerciseById(id)
    })

    this.When(/^I request details of item with the slug "([^"]*)"$/, function (slug) {
        return this.getExerciseBySlug(slug)
    })

    this.Then(/^I should see number of total exercises equal "([^"]*)"$/, function (total) {
        const body = this.getLastResponseBody()

        const expectedTotalCount = parseInt(total, 10)

        expect(body.totalCount).to.equal(expectedTotalCount)
    })

    this.Then(/^I should see( just)? exercise "([^"]*)"$/, function (just, title) {
        const body = this.getLastResponseBody()

        if (body.data && !just) {
            const data = body.data

            const result = data.filter(exercise => {
                return exercise.title == title
            })

            expect(result).to.have.length.above(0)
        } else {
            expect(body).to.have.property('title').equal(title)
        }
    })

    this.Then(/^I should not see exercises specs$/, function () {
        const body = this.getLastResponseBody()

        const data = body.data

        const result = data.filter(exercise => {
            return exercise.specsCode
        })

        expect(result).to.have.length(0)
    })

    this.Then(/^I should see exercise specs$/, function () {
        const body = this.getLastResponseBody()

        expect(body.specsCode).to.be.ok
    })
}
