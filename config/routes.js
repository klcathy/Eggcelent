var restaurants = require('../app/controllers/restaurant');
var config      = require('../config');

module.exports = function(app, express) {
    console.log('Initializing routes.');

    var apiRouter = express.Router();

    apiRouter.route('/restaurants')
        .get(restaurants.list)
        .post(restaurants.create);
    apiRouter.route('/restaurants/:restaurantId')
        .get(restaurants.show)
        .put(restaurants.update)
        .delete(restaurants.delete);

    // Set restaurantId param
    apiRouter.param('restaurantId', restaurants.restaurant);

    return apiRouter;
};