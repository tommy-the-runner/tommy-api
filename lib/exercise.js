'use strict'

const Immutable = require('immutable')
const uuid = require('uuid')
const slugify = require('slug')

const Exercise = {
    create: function (title, specsCode) {
        const slug = slugify(title, { lower: true })

        return Immutable.Map({
            id: uuid.v4(),
            title,
            specsCode,
            slug
        });
    }

}

module.exports = Exercise
