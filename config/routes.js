var restaurants = require('../app/controllers/restaurant');
var users       = require('../app/controllers/user');

module.exports = function(app, express) {
    console.log('Initializing routes.');

    var apiRouter = express.Router();

    apiRouter.use(function(req, res, next) {
        console.log('Middleware stuff!');
        next();
    });

    // user routes
    apiRouter.route('/users')
        .post(users.create);

    // restaurant routes
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