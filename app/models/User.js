/* User model
 User(id, email, password)
 */
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        instanceMethods: {
            // hash password before storing it
            //setPassword: function (password, next) {
            //    var user = this;
            //
            //    // hash the password only if the password has been changed or user is new
            //    if (!user.changed('password')) return next();
            //
            //    bcrypt.genSalt(10, function(err, salt) {
            //        bcrypt.hash(password, salt, function(err, hash) {
            //            if (err) return next(err);
            //
            //            user.password = hash;
            //            console.log('Password set as ' + hash);
            //            next();
            //        });
            //    });
            //},

            // compare user supplied password with one stored in DB
            verifyPassword: function(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });
    return User;
};