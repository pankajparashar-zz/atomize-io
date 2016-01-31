var assert = require('assert')
var isCss = require('..')

var cssPaths = [
  'foo/file.css',
  'src/foo/bar/file.CSS',
  'http://foo.com/bar.css'
]

var nonCssPaths = [
  'foo/filecss',
  'file',
  'file.scss'
]

describe('is-css', function() {

  it('should return true for css files', function() {
    cssPaths.forEach(function(cssFile) {
      assert.ok(isCss(cssFile))
    })
  })

  it('should return false for non css files', function() {
    nonCssPaths.forEach(function(nonCssFile) {
      assert.ok(!isCss(nonCssFile))
    })
  })
})
