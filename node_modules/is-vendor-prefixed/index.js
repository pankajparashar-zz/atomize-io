'use strict';

var vendorPrefixes = require('vendor-prefixes');

module.exports = function isVendorPrefixed(property) {
  if (typeof property != 'string') {
    throw new TypeError('is-vendor-prefixed expected a string');
  }

  var regexForPrefixes = new RegExp('^(' + vendorPrefixes().join('|') + ')([a-z\-]+)$', 'i');
  return regexForPrefixes.test(property);
}
