var assert = require('assert');
var vendorPrefixes = require('..');

var prefixes = [
  '-ms-',
  'mso-',
  '-moz-',
  '-o-',
  '-xv-',
  '-atsc-',
  '-wap-',
  '-khtml-',
  '-webkit-',
  'prince-',
  '-ah-',
  '-hp-',
  '-ro-',
  '-rim-',
  '-tc-'
];

describe('vendor-prefixes', function() {

  it('should return an array of all prefixes', function() {
    assert.deepEqual(vendorPrefixes(), prefixes);
  });
});
