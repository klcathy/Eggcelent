var db = require('../../config/sequelize');

// Create a Restaurant
exports.create = function(req, res) {
    db.Restaurant.create(req.body).then(function() {
        return res.jsonp({ message: 'Restaurant created!'});
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

// Find a restaurant by id
exports.restaurant = function(req, res, next, id) {
    db.Restaurant.find({where: {id: id}}).then(function(restaurant){
        if(!restaurant) {
            return next(new Error('Failed to load restaurant ' + id));
        } else {
            req.restaurant = restaurant;
            return next();
        }
    }).catch(function(err){
        return next(err);
    });
};

// Show a Restaurant
exports.show = function(req, res) {
    // Sending down the article that was just preloaded by the articles.article function
    // and saves article on the req object.
    return res.jsonp(req.restaurant);
};

/**
 * Update a Restaurant
 */
exports.update = function(req, res) {
    var restaurant = req.restaurant;

    restaurant.updateAttributes({
        name: req.body.name,
        rating: req.body.rating,
        priceRange: req.body.priceRange,
        cuisine: req.body.cuisine,
        category: req.body.category,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        phone: req.body.phone,
        website: req.body.website
    }).then(function(updated){
        return res.jsonp(updated);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Delete a Restaurant
 */
exports.delete = function(req, res) {
    var restaurant = req.restaurant;

    restaurant.destroy().then(function(){
        return res.jsonp(restaurant);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};
