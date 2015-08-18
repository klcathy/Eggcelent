// load express package and create app
var express = require('express');
var app = express();
var path = require('path');

// send index.html file to user for home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// start server
app.listen(8000);
console.log('On port 8000: Testing the testiest test of all tests!!!');
