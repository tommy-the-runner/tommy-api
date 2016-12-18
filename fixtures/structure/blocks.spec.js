var expect = require('chai').expect

var util = require('subject')
var divide = util.divide

describe('util', function () {
  describe('divide', function () {
    context('when dividing by 0', function () {
      it('should be Inifinity', function () {
        expect(divide(20, 0)).to.equal(Infinity)
      })
    })

    context('when dividing by value > 0', function () {
      it('should return correct result', function () {
        expect(divide(20, 4)).to.equal(5)
      })
    })
  })
})
