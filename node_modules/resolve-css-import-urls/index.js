'use strict';

var urlResolver = require('url').resolve;
var getImports = require('get-imports');
var getCssUrls = require('get-css-urls');
var isUrl = require('is-url');

module.exports = function(url, css) {
  if(typeof url != 'string' || typeof css != 'string' || !isUrl(url)) {
    throw new TypeError('resolve-css-imports expected two string parameters (url, css)');
  }

  var cssUrls = getImports(css).map(function(importStatement) {
    // url('blah.css') => blah.css
    var cssRelativePath = getCssUrls(importStatement);

    if(!cssRelativePath.length) {
      cssRelativePath = importStatement.match(/["'](.*?)["']/ig)
    }

    if(cssRelativePath && cssRelativePath.length) {
      cssRelativePath = cssRelativePath[0].replace('url(', '').replace(/["'()]/g,'');
    }

    return urlResolver(url, cssRelativePath);
  });

  return cssUrls || [];
}
