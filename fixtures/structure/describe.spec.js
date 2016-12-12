var util = require('subject')
var divide = util.divide

describe('util', function () {
  describe('divide', function () {
    it('should return correct result', function () {
      expect(divide(20, 4)).to.equal(5)
    })
  })
})
