var chai = require('chai')
var sinon = require('sinon')
var Util = require('subject')

chai.use(require('sinon-chai'))

var expect = chai.expect

describe('Util', function () {
  describe('#getFour', function () {
    it('returns a number 4', function () {
      var res = Util.getFour()
      expect(res).to.eq(4)
    })
  })

  describe('#getFourAsync', function () {
    it('returns a number 4', function () {
      var spy = sinon.spy()
      Util.getFourAsync(spy)
      expect(spy).to.have.been.calledWith(null, 4)
    })
  })
})
