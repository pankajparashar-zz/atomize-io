var app = require('express')();
var http = require('http').Server(app);
var getCss = require('get-css');
var fs = require('fs');
var cssstats = require('cssstats');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res){
    res.sendFile(__dirname + '/style.css');
});

app.get(['/apple-touch-icon.png', '/favicon.ico'], function(req, res){
  res.sendFile(__dirname + '/apple-touch-icon.png');
});

app.get('/*', function(req, res){

    var html = '<!doctype html>\
    <html>\
        <head>\
            <meta charset="utf-8">\
            <title>Atomize IO - ' + req.url.substring(1) + '</title>\
            <link rel="stylesheet" href="/style.css" media="screen" title="no title" charset="utf-8">\
        </head>\
        <body style="position: relative">\
            <a href="https://twitter.com/intent/tweet?url=https://atomize-io.herokuapp.com&text=Atomize%20your%20website%20with%20Atomize.io&via=pankajparashar" style="position: absolute;top: 1em; right: 0" target="_blank">Share</a>\
            <h1 style="border-bottom: 1px solid #ccc;">Atomize <span style="background: black; color: white; padding: .25em;">IO</span></h1>\
            <p>Atomize your website to check how much you can benefit by adopting <strong>Atomic CSS!</strong>\
            <br><br><span style="padding-left: 2em;">★ Suffix the URL in the address bar with the domain name.</span>\
                 <br> <span style="padding-left: 2em;">★ Press ENTER to see the magic!</span>\
            </span></p>\
            <div class="window browser fading">\
              <div class="header">\
                <span class="bullet bullet-red"></span><span class="bullet bullet-yellow"></span><span class="bullet bullet-green"></span><span class="title"><span class="scheme">https://</span>atomize-io.herokuapp.com<span style="background-color: gold">'+ req.url +'</span></span>\
              </div>\
              <div style="padding: 1.5em;">';


    var url = 'http://' + req.url.substring(1);

    getCss(url, {timeout: 5000}).then(function(response){

        result = cssstats(response.css);
        var declarations = result['declarations'];
        var unique_declarations = 0;
        for (var prop in declarations['properties']) {
            unique_declarations = unique_declarations + declarations.getUniquePropertyCount(prop);
        }

        var aSize = Math.round((result.size*unique_declarations)/declarations.total);
        var aGzipSize = Math.round((result.gzipSize*unique_declarations)/declarations.total);

        html += '<table><tbody>';
        html += '<tr><td colspan="2"><h1>' + declarations.total + '</h1><cite>No. of declarations (before)</cite></td>' + '<td colspan="2"><h1 style="color: green">' + unique_declarations + '</h1><cite>No. of declarations (after atomization)</cite></td></tr>';
        html += '<tr><td><h1>' + result.size + '</h1><cite>size (in bytes)</cite></td><td><h1>' + result.gzipSize + '</h1><cite>gzip size (in bytes)</cite></td>';
        html += '<td><h1>' + aSize + '</h1><cite>size (in bytes)</cite></td><td><h1>' + aGzipSize + '</h1><cite>gzip size (in bytes)</cite></td></tr>';
        html += '<tr><td colspan="4"><div class="tip">Atomic CSS can reduce the page weight of <strong>' + req.url.substring(1) + '</strong> by ' +  Math.floor(((result.gzipSize-aGzipSize)/result.gzipSize)*100) + '%</div></td></tr>';
        html += '</tbody></table></div></div>\
        <footer style="border-top: 1px solid #ccc; margin-top: 5em; ">\
          <p><span>on <a href="https://github.com/pankajparashar/atomize-io">Github</a> | via <a href="https://www.heroku.com/">Heroku</a></span>\
              <span style="float: right">by <a href="https://pankajparashar.com">Pankaj Parashar</a></span>\
          </p></footer>   <script>\
        !function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(\
        arguments)};d=s.createElement(q);q=s.getElementsByTagName(q)[0];\
        d.src="//d1l6p2sc9645hc.cloudfront.net/tracker.js";q.parentNode.\
        insertBefore(d,q)}(window,document,"script","_gs");\
        _gs("GSN-360111-P");\
    </script></body></html>';
        res.send(html);
    });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});
