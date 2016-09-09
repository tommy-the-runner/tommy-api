var expect = require('chai').expect
var renderActionButton = require('subject')

describe('renderActionButton', function () {

  it('should render basic html code', function () {
    var html = renderActionButton('Download')

    expect(html).to.equal(
      '<button class="action-button">Download</button>'
    )
  })

  it('should apply a custom modifier', function () {
    var html = renderActionButton('Buy', {
      modifier: 'is-buy_button'
    })

    expect(html).to.equal(
      '<button class="action-button is-buy_button">Buy</button>'
    )
  })
})
