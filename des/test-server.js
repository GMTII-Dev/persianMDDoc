var express = require('express'),
    app = express(),
    http    = require('http'),
    server  = http.createServer(app);

var dir = __dirname;

app.use(express.static(dir));

app.get('/', function(req, res){
  res.sendFile(dir + '/html/index.html');
});

app.get('/api/:user-:pass', function(req, res) {
    var user    = req.params.user;
    var pass    = req.params.pass;
    // console.log("\nusername: "+user+'\npassword: '+pass);
    if ((user=='admin')&&(pass=='admin')) {
        res.status(200).send("Success");
    } else {
        res.status(403).send("Error");
    }
});

var hostname    = '0.0.0.0',
    port        = '8000';

server.listen(port, hostname, function() {
    console.log('Listen to '+hostname+':'+port);
});
