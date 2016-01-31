var assert = require('assert');
var isVendorPrefixed = require('..');

var prefixedProperties = [
  '-ms-background-image', 'mso-background-image', // Microsoft
  '-moz-background-image',	                      // Mozilla
  '-o-background-image', '-xv-background-image',  // Opera Software
  '-atsc-background-image',                       //	Advanced Television Standards Committee
  '-wap-background-image',                        //	The WAP Forum
  '-khtml-background-image',                      //	KDE
  '-webkit-background-image',                     //	Apple
  'prince-background-image',                      //	YesLogic
  '-ah-background-image',                         //	Antenna House
  '-hp-background-image',                         //	Hewlett Packard
  '-ro-background-image',                         //	Real Objects
  '-rim-background-image',                        //	Research In Motion
  '-tc-background-image'                          //	TallComponents
];

var unprefixedProperties = [
  'background-image',
  'foo-bar',
  '-not-valid-background-image',
  '-mozbackground-image',
  'mox-background-image'
];

describe('is-vendor-prefixed', function() {

  it('should do return true for prefixed properties', function() {
    prefixedProperties.forEach(function(property) {
      assert.ok(isVendorPrefixed(property));
    });
  });

  it('should do return false for unprefixed properties', function() {
    unprefixedProperties.forEach(function(property) {
      assert.ok(!isVendorPrefixed(property));
    });
  });
});
