function renderHtml(tagName, attrs, children) {
  var childrenHtml = children || ''
  var attributes = ''
  for (var key in attrs) {
    attributes += ' ' + key + '="' + attrs[key]+ '"'
  }

  var startTag = '<' + tagName + attributes + '>'
  var endTag = '</' + tagName + '>'

  return  startTag + childrenHtml + endTag
}

module.exports = renderHtml
