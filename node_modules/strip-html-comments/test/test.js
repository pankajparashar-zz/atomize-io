var assert = require('assert')
var stripHtmlComments = require('..')

describe('strip-html-comments', function() {

  it('should remove comments with new lines', function() {
    assert.equal(stripHtmlComments('<span><!-- blah \n\n\n -->'), '<span>')
  })

  it('should handle multiple comments', function() {
    assert.equal(stripHtmlComments('<span><!-- --><!-- --></span>'), '<span></span>')
  })

  it('should handle a comment with no body', function() {
    assert.equal(stripHtmlComments('<span><!----></span>'), '<span></span>')
  })

  it('should handle a comment with no spaces', function() {
    assert.equal(stripHtmlComments('<span><!--foo--></span>'), '<span></span>')
  })

  it('should not strip invalid comments', function() {
    assert.equal(stripHtmlComments('<span><!-- foo -></span>'), '<span><!-- foo -></span>')
  })
})
