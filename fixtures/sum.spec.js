const expect = require('chai').expect
const sum = require('the code from the left panel')

describe('sum', function () {

  it('should sum two numbers', function () {
    expect(sum(1, 1)).to.equal(2)
  })
})
