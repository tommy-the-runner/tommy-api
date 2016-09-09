const expect = require('chai').expect
const sum = require('subject')

describe('sum', function () {

  it('should sum two numbers', function () {
    expect(sum(1, 1)).to.equal(2)
  })
})
