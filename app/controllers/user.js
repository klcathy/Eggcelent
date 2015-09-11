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

exports.me = function(req, res) {
    res.send(req.decoded);
};

exports.list = function(req, res) {
    db.User.findAll().then(function(users){
        return res.jsonp(users);
    }).catch(function(err) {
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.user = function(req, res, next, id) {
    db.User.find({where: {id: id}}).then(function(user){
        if(!user) {
            return next(new Error('Failed to load user ' + id));
        } else {
            req.user = user;
            return next();
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.show = function(req, res) {
    return res.jsonp(req.user);
};

// has bug where it hashes blank password
exports.update = function(req, res) {
    var user = req.user;
    var new_password = user.updatePassword(req.user.password);

    user.updateAttributes({
        username: req.body.username,
        email: req.body.email,
        password: new_password
    }).then(function(updated){
        return res.jsonp(updated);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.delete = function(req, res) {
    var user = req.user;

    user.destroy().then(function(){
        return res.jsonp({ message: 'User deleted!'});
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};