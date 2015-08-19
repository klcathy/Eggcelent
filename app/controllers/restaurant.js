var db = require('../../config/sequelize');

// Create a Restaurant
exports.create = function(req, res) {
    db.Restaurant.create(req.body).then(function (restaurant) {
        return res.jsonp(restaurant);
    }).catch(function (err) {
        return res.render('error', {
            error: err,
            status: 400
        });
    });
};

// List of Restaurants
exports.list = function(req, res) {
    db.Restaurant.findAll().then(function(restaurants){
        return res.jsonp(restaurants);
    }).catch(function(err) {
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};