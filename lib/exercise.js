'use strict'

const Immutable = require('immutable')

const Exercise = {
    create: function (title, specsCode) {
        return Immutable.Map({
            title,
            specsCode
        });
    }

}

module.exports = Exercise
