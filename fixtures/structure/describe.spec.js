var MyClass = require('subject')

describe('MyClass', function () {
  describe('sayHello', function () {
    it('should say "Hello"', function () {
      var object = new MyClass()
      expect(object.sayHello()).to.equal('Hello')
    })
  })
})
