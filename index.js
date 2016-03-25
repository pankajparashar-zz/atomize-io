'use strict'

var app = require('express')();
var http = require('http').Server(app);
var request = require('request');
var getCss = require('get-css');
var cssstats = require('cssstats');
var purify = require('purify-css');
var postcss = require('postcss');
var gzipSize = require('gzip-size');

/**
 * PostCSS plugin
 */

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('default', {
        title: 'mywebsite.com',
    });
});

app.get('/style.css', function(req, res){
    res.sendFile(__dirname + '/style.css');
});

app.get(['/apple-touch-icon.png', '/favicon.ico'], function(req, res){
  res.sendFile(__dirname + '/apple-touch-icon.png');
});

app.get('/*', function(req, res){

    var url = 'http://' + req.url.substring(1);
    request(url, function(error, response, body){
        getCss(url, {timeout: 5000}).then(function(response){

            var result1 = cssstats(response.css);
            var declarations1 = result1['declarations'];

            var output1 = getAtomicCSS(response.css)
            var unique1 = output1.uniqueID;
            var acss1 = output1.outputCSS;

            purify(body, response.css, {minify: true}, function(output){
                var result2 = cssstats(output);
                var declarations2 = result2['declarations'];

                var output2 = getAtomicCSS(output)
                var unique2 = output2.uniqueID;
                var acss2 = output2.outputCSS;

                res.render('index', {
                    title: req.url.substring(1),

                    cc_brulesets: result1['rules']['total'],
                    cc_bselectors: result1['selectors']['total'],
                    cc_bdeclarations: result1['declarations']['total'],
                    cc_bsize: (result1['size']/1024).toFixed(2),
                    cc_bgzipped: (result1['gzipSize']/1024).toFixed(2),

                    cc_arulesets: unique1,
                    cc_aselectors: unique1,
                    cc_adeclarations: unique1,
                    cc_asize: (Buffer.byteLength(acss1, 'utf8')/1024).toFixed(2),
                    cc_agzipped: (gzipSize.sync(acss1)/1024).toFixed(2),

                    sc_brulesets: result2['rules']['total'],
                    sc_bselectors: result2['selectors']['total'],
                    sc_bdeclarations: result2['declarations']['total'],
                    sc_bsize: (result2['size']/1024).toFixed(2),
                    sc_bgzipped: (result2['gzipSize']/1024).toFixed(2),

                    sc_arulesets: unique2,
                    sc_aselectors: unique2,
                    sc_adeclarations: unique2,
                    sc_asize: (Buffer.byteLength(acss2, 'utf8')/1024).toFixed(2),
                    sc_agzipped: (gzipSize.sync(acss2)/1024).toFixed(2),
                });

            });
        });
    });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});

function getAtomicCSS(inputCSS) {

    let uniqueID
    let stylesCache

    const dedupe = postcss.plugin('postcss-dedupe-css', (opts) => (css, result) => {
      uniqueID = 0
      stylesCache = {}

      css.walkDecls(function (decl) {
        var prop = decl.prop
        var value = decl.value
        var cacheKey = `${prop}:${value}`
        if (!stylesCache[cacheKey]) {
          stylesCache[cacheKey] = {
            id: `__style${++uniqueID}`,
            style: { [prop]: value }
          }
        }
      })
    })

    postcss([dedupe()]).process(inputCSS).css

    const createCssDeclarations = (style) => Object.keys(style).map((prop) => {
      const value = style[prop]
      return `${prop}:${value};`
    }).sort().join('')

    const dedupedCSS = Object.keys(stylesCache).sort().reduce((str, key) => {
      const id = stylesCache[key].id
      const style = stylesCache[key].style
      const declarations = createCssDeclarations(style)
      const rule = `\n.${id}{${declarations}}`
      str += rule
      return str
    }, '')

    return { uniqueID: uniqueID, outputCSS: dedupedCSS }
}
