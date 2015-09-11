var jwt = require('jsonwebtoken');
var restaurants = require('../app/controllers/restaurant');
var users       = require('../app/controllers/user');

// super secret for creating tokens
var secretToken = 'ooohsupersecrettoken';

module.exports = function(app, express) {
    console.log('Initializing routes.');

    var apiRouter = express.Router();

    //// authentication routes
    //apiRouter.route('/authenticate')
    //    .post(users.authenticate);
    //
    //// route middleware to verify a token
    //apiRouter.use(function(req, res, next) {
    //    // check header or url parameters or post parameters for token
    //    var token = req.body.token || req.query.token || req.headers['x-access-token']; // decode token
    //
    //    if (token) {
    //        // verifies secret and checks exp
    //        jwt.verify(token, secretToken, function(err, decoded) {
    //            if (err) {
    //                return res.status(403).send({
    //                    message: 'Failed to authenticate token.'
    //            });
    //            } else {
    //             // if everything is good, save to request for use in other routes
    //            req.decoded = decoded;
    //
    //            next();
    //            }
    //        });
    //
    //    } else {
    //    // if there is no token
    //    // return an HTTP response of 403 (access forbidden) and an error message
    //    return res.status(403).send({
    //        message: 'No token provided.'
    //    });
    //    }
    //});

    // user routes
    apiRouter.route('/users')
        .get(users.list)
        .post(users.create);
    apiRouter.route('/users/:userId')
        .get(users.show)
        .put(users.update)
        .delete(users.delete);

    apiRouter.param('userId', users.user);

    // api endpoint to get user info
    apiRouter.get('/me', users.me);

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