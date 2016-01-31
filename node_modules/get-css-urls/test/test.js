var assert = require('assert');
var getCssUrls = require('..');

describe('get-css-urls', function() {

  it('should match multiple urls', function() {
    assert.deepEqual(
      getCssUrls("url(foo.css); lksjhlksjhdf url(bar.css);"),
      ["url(foo.css)", "url(bar.css)"]);
  });

  it('should not match urls that are not there', function() {
    assert.deepEqual(
      getCssUrls("(foo.css); lksjhlksjhdf"),
      []);
  });

  it('should throw an error if a string is not passed', function() {
    assert.throws(getCssUrls);
  });
});
