'use strict'

const Immutable = require('immutable')
const uuid = require('uuid')

const Exercise = {
    create: function (title, specsCode) {
        return Immutable.Map({
            id: uuid.v4(),
            title,
            specsCode
        });
    }

}

module.exports = Exercise
