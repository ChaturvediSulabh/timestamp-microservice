const express = require('express');
const app = express();
const url = require('url');
const path = require('path')
app.get('', function(req, res){
    res.sendfile('default.html', { root: __dirname + "/client"} );
});
app.get('/*',function(req,res){
  const data = url.parse(req.url,true);
  let query = data.path;
  let myObj = {};
  console.log("0, ",query);
  const notEpoch = query.search(/[a-zA-Z ,%;:-]+/g);
  if(notEpoch === -1){
    query = query.replace("/","");
    myObj.unix = parseInt(query);
    let u_d = parseInt(query) * 1000;
    u_d = new Date(u_d);
    myObj.natural = u_d.toDateString();
  }else{
    let dStr = query.replace(/%20/g," ");
    console.log(query);
    n_d = new Date(dStr);
    n_d = n_d.toDateString();
    let u_d = new Date(n_d).getTime() / 1000;
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

