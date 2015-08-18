// LOAD PACKAGES =======================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Sequelize = require('sequelize');
var port = process.env.PORT || 3000;
var path = require('path');

// SEQUELIZE CONFIGUARTION =============================================
// create an instance of sequelize
var db = new Sequelize('development', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

// check database connection
db.authenticate().then(function(err) {
    if (err) {
        console.log('Unable to connect to the database:', err);
    } else {
        console.log('Connection has been established successfully.');
    }
});

// sync all models that aren't already in database
db.sync();

// APP CONFIGURATION
// configure body parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type, ' +
        'Authorization');
    next();
});

// log all requests to console
app.use(morgan('dev'));

// send index.html file to user for home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//ROUTES CONFIGURATION ===============================================
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
//
//// restaurants page (/restaurants)
//adminRouter.get('/restaurants', function(req, res) {
//    res.send('I am the restaurants page!');
//});
//
//// categories page (/categories)
//adminRouter.get('/categories', function(req, res) {
//    res.send('I am the categories page!');
//});

// RESTAURANTS ROUTE =======================================================
var Restaurant = db.define('Restaurant', {
        name: {
            type: Sequelize.STRING,
            allownull: false,
        },
        rating: Sequelize.DECIMAL,
        priceRange: Sequelize.INTEGER,
        cuisine: Sequelize.STRING,
        category: Sequelize.STRING,
        streetAddress: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        phone: Sequelize.STRING,
        website: Sequelize.STRING,
    }, {
        associate: function(models) {
            Restaurant.hasMany(models.Category);
        }

    }
);

adminRouter.route('/restaurants')
    // create a restaurant
    .post(function(req, res) {
        Restaurant.create(req.body).then(function (restaurant) {
            return res.jsonp(restaurant);
        }).catch(function (err) {
            return res.render('error', {
                error: err,
                status: 400
            });
        });
    })

    // list all restaurants
    .get(function(req, res) {
        Restaurant.findAll().then(function(restaurants){
            return res.jsonp(restaurants);
        }).catch(function(err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
    });

// apply routes to application
app.use('/app', adminRouter);

// start server
app.listen(port);
console.log('Starting app on port ' + port);

