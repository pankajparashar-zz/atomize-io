var isEmpty = require('is-empty')
var isWhitespace = require('is-whitespace')

module.exports = function isBlank (object) {
  if (typeof object === 'boolean') {
    return false
  }

  if (typeof object === 'string' && object.length) {
    return isWhitespace(object)
  } else {
    return isEmpty(object)
  }
}
