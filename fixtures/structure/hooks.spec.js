var doSomething = require('subject')

describe('the method', function () {
  beforeEach(function () {
    console.log('Main setup')
  })

  afterEach(function () {
    console.log('Main clean up')
  })

  context('under some conditions', function () {
    beforeEach(function () {
      console.log('Some conditions setup')
    })

    afterEach(function () {
      console.log('Some conditions clean up')
    })

    it('should behave like this', function () {
      doSomething()
    })
  })
})
