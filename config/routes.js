var restaurants = require('../app/controllers/restaurant');
var config      = require('../config');

module.exports = function(app, express) {
    console.log('Initializing routes.');

    var apiRouter = express.Router();

    apiRouter.route('/restaurants')
        .get(restaurants.list)
        .post(restaurants.create);

    return apiRouter;
};