var express = require('express');
var app = express();
var url = require('url');
var path = require('path')
app.get('', function(req, res){
    res.sendfile('default.html', { root: __dirname + "/client"} );
});
app.get('/*',function(req,res){
   data = url.parse(req.url,true);
  var query = data.path;
  var myObj = {};
  var isunix = query.match(/[0-9]+/g);
  isunix = isunix.join('');
  var isFound = query.search(/[a-zA-Z0-9,%]+/g);
  if(isunix.length === 10){
    myObj.unix = parseInt(isunix);
    var u_d = parseInt(isunix) * 1000;
    u_d = new Date(u_d);
    myObj.natural = u_d.toDateString();
  }else if (isFound != -1) {
    var dStr = query.replace(/%20/g," ");
    n_d = new Date(dStr);
    n_d = n_d.toDateString();
    var u_d = new Date(n_d).getTime() / 1000;
    myObj.unix = u_d;
    myObj.natural = n_d;
  }
  if(myObj){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(myObj));
   }else {
      res.writeHead(404);
      res.end();
   }
});
app.listen(process.env.PORT || 8080);
