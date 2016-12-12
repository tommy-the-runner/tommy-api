var util = require('subject')
var divide = util.divide

it('should return 5', function () {
  var result = divide(20, 4)
  if (result !== 5) {
    throw 'Expected divide(20, 4) to equal 5, got ' + result + ' instead'
  }
})
