var chai = require('chai')
var sinon = require('sinon')
var getFour = require('subject')

chai.use(require('sinon-chai'))

var expect = chai.expect

describe('#getFour', function () {
  it('returns the number 4', function () {
    expect(getFour()).to.eq(4)
  })

  it('returns the number 4 by callback', function () {
    var callback = sinon.spy()
    getFour(callback)

    expect(callback).to.have.been.calledWith(null, 4)
  })
})
