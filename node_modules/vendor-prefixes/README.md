# vendor-prefixes

[![Build Status](https://secure.travis-ci.org/johnotander/vendor-prefixes.png?branch=master)](https://travis-ci.org/johnotander/vendor-prefixes)

List of the current CSS vendor prefixes.

<http://www.w3.org/TR/CSS21/syndata.html#vendor-keyword-history>

## Installation

```bash
npm install --save vendor-prefixes
```

## Usage

```javascript
var vendorPrefixes = require('vendor-prefixes');

vendorPrefixes();  // => ['-webkit-', '-moz-', ...]
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
