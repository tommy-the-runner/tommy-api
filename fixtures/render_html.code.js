function renderHtml(tagName, attrs, children) {
  var childrenHtml = children || ''
  var attributes = ''
  for (var key in attrs) {
    attributes += ' ' + key + '="' + attrs[key]+ '"'
  }

  return '<' + tagName + attributes + '>' + childrenHtml + '</' +tagName + '>'
}

module.exports = renderHtml
