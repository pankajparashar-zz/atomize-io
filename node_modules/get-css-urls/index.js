'use strict';

var cssUrlRegex = require('css-url-regex');

module.exports = function(css) {
  if(typeof css != 'string') {
    throw new TypeError('get-css-urls expects a string');
  }

  return css.match(cssUrlRegex()) || [];
};
