var db = require('../../config/sequelize');
var jwt = require('jsonwebtoken');

// super secret for creating tokens
var secretToken = 'ooohsupersecrettoken';

exports.create = function(req, res) {
    var user = db.User.build(req.body);
    user.setPassword(user, req.body.password);
    user.save().then(function() {
        return res.jsonp({ message: 'User created!'});
    });

    //db.User.create(req.body).then(function() {
    //    return res.jsonp({message: 'User created!'});
    //}).catch(function (err) {
    //    return res.render('error', {
    //        error: err,
    //        status: 400
    //    });
    //});
};

exports.authenticate = function(req, res) {
    db.User.find({where: {username : req.body.username }}).then(function(user) {
        if (!user)
            return res.jsonp({ message: 'Authentication failed. User not found.'});
        else if (user) {
            // check if password matches
            var validPassword = user.verifyPassword(req.body.password);

            if (!validPassword) {
                res.jsonp({ message: 'Authentication failed. Wrong password.'});
            }

            // user is found and password is right
            else {
                var token = jwt.sign({
                    username: user.username,
                    email: user.email
                }, secretToken, {
                expiresInMinutes: 1440 // expires in 24 hours
            });
            res.json({ message: 'Authentication success.', token: token});
            }
        }
    }).catch(function(err) {
        throw err;
    });
};