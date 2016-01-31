var assert = require('assert');
var resolveCssImports = require('..');

describe('resolve-css-import-urls', function() {

  it('should handle a standard import statements', function() {
    assert.deepEqual(
      resolveCssImports('http://foo.com/my-css.css', '@import url(bar.css); @import url("css/baz.css");'),
      ['http://foo.com/bar.css', 'http://foo.com/css/baz.css']);
  });

  it('should handle a standard relative url import statements', function() {
    assert.deepEqual(
      resolveCssImports('http://foo.com/css/my-css.css', "@import url('../bar.css');"),
      ['http://foo.com/bar.css']);
  });

  it('should return an empty array if no import url statments exist', function() {
    assert.deepEqual(resolveCssImports('http://foo.com', 'bar'), []);
  });

  it('should handle single quoted urls', function() {
    assert.deepEqual(
      resolveCssImports('http://foo.com/css/my-css.css', "@import '../bar.css' print;"),
      ['http://foo.com/bar.css']);
  });

  it('should handle double quoted urls', function() {
    assert.deepEqual(
      resolveCssImports('http://foo.com/css/my-css.css', "@import \"bar.css\" projection;"),
      ['http://foo.com/css/bar.css']);
  });

  it('should throw a type error if a string is not provided', function() {
    assert.throws(resolveCssImports);
  });

  it('should throw a type error if an invalid url is provided', function() {
    assert.throws(function() {
      resolveCSSImports('invalid-url');
    });
  });
});
