var chai = require('chai')
var hasAccess = require('subject')

var expect = chai.expect

describe('#hasAccess', function () {
  context('when role is anonymous', function () {
    it('disallows to write posts', function () {
      expect(hasAccess('anonymous', 'post:write')).to.be.false
    })

    it('disallows to delete posts', function () {
      expect(hasAccess('anonymous', 'post:read')).to.be.false
    })
  })
})
