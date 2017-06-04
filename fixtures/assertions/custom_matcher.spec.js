var chai = require('chai')
var chaiPost = require('the code from the left panel')

chai.use(chaiPost)

var expect = chai.expect

describe('post', function () {
  it('has tag `javascript`', function () {
    var post = {
      title: 'My Blog Post',
      tags: ['javascript', 'ui']
    }

    expect(post).to.have.tag('javascript')
  })

  it('has not tag `php`', function () {
    var post = {
      title: 'My Other Blog Post',
      tags: ['lua', 'games']
    }

    expect(post).to.not.have.tag('php')
  })
})
