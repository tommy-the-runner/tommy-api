var expect = require('chai').expect
var renderHtml = /* your code here */

describe('renderHtml', function () {

  it('should render correct tag name', function () {
    var html = renderHtml('span')

    expect(html).to.equal(
      '<span></span>'
    )
  })

  it('should render correct attributes', function () {
    var html = renderHtml('div', { 'class': 'panel' })

    expect(html).to.equal(
      '<div class="panel"></div>'
    )
  })

  it('should render html children', function () {
    var html = renderHtml('div', {}, [
      renderHtml('span')
    ])

    expect(html).to.equal(
      '<div><span></span></div>'
    )
  })

  it('should render plain string children', function () {
    var html = renderHtml('a', { href: '#' }, [
      'My link'
    ])

    expect(html).to.equal(
      '<a href="#">My link</a>'
    )
  })
})
