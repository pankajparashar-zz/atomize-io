var assert = require('assert');
var hasPseudoClass = require('..');

var pseudoClasses = [
  ':not(a)',
  'ul li:first-child',
  'a:visited',
  '*:active',
  '#some-id:nth-child(3)',
  '#some-id:nth-last-child(3)',
  '.some-selector > ul > li:hover',
  '.some-selector > ul > li:focus'
];

var noPseudoClasses = [
  '.foo-bar',
  '.foo-bar:after',
  '.foo-bar::after'
];

describe('has-pseudo-class', function() {

  it('should return true when there is a pseudo element', function() {
    pseudoClasses.forEach(function(pseudoClass) {
      assert.ok(hasPseudoClass(pseudoClass));
    });
  });

  it('should return false when there is no pseudo element', function() {
    noPseudoClasses.forEach(function(noPseudoClass) {
      assert.ok(!hasPseudoClass(noPseudoClass));
    });
  });
});
