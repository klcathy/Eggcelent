// load packages
var express = require('express');
var app = express();
var sequelize = require('sequelize');
var path = require('path');

// create instance of sequelize
var db = new sequelize('development', 'root', '', {
    host: 'localhost',
    port: '8000',
    dialect: 'mysql',
});

// send index.html file to user for home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// create routes for the Admin section

// get an instance of the router
var adminRouter = express.Router();

// route middleware
adminRouter.use(function(req, res, next) {
    //log each request to console
    console.log(req.method, req.url);
    next();
});

// homepage (/home)
adminRouter.get('/', function(req, res) {
    res.send('I am the home page!');
});

// restaurants page (/restaurants)
adminRouter.get('/restaurants', function(req, res) {
    res.send('I am the restaurants page!');
});

// categories page (/categories)
adminRouter.get('/categories', function(req, res) {
    res.send('I am the categories page!');
});

// apply routes to application
app.use('/app', adminRouter);

// start server
app.listen(8000);
console.log('Starting the app on port 8000!');

