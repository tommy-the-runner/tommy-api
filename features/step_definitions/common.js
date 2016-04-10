'use strict'

module.exports = function () {
    this.Given(/^there is exercise "([^"]*)" with specs as in "([^"]*)"$/, function (title, filename) {
        return this.addExercise({
            title: title,
            specsCode: filename
        })
    })
}
