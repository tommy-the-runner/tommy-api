const expect = require('chai').expect
const sum = require('subject')

describe('multiplication', function () {
  it('should multple two numbers', function () {
    expect(sum(1, 1)).to.equal(1)
  })
})
