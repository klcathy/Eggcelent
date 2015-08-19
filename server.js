// LOAD PACKAGES =======================================================
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var db         = require('./config/sequelize');
var config     = require('./config');
var path       = require('path');

// APP CONFIGURATION ===================================================
// configure body parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type, ' +
        'Authorization');
    next();
});

// log all requests to console
app.use(morgan('dev'));

// set static files location
app.use(express.static(__dirname + '/public'));

//ROUTES CONFIGURATION =================================================
// API ROUTES
var apiRoutes = require('./config/routes')(app, express);
app.use('/app', apiRoutes);

// MAIN CATCHALL ROUTE
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// start server
app.listen(config.port);
console.log('Starting app on port ' + config.port);

//expose app
exports = module.exports = app;

