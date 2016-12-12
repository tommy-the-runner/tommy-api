var add = require('subject')

it('should return 5', function () {
  var result = add(2, 3)
  if (result !== 5) {
    throw 'Expected add(2, 3) to equal 5, got ' + result + ' instead'
  }
})
