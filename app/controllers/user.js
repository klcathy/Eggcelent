var db = require('../../config/sequelize');

exports.create = function(req, res, next) {
    db.User.create(req.body).then(function() {
        return res.jsonp({message: 'User created!'});
    }).catch(function (err) {
        return res.render('error', {
            error: err,
            status: 400
        });
    });
};