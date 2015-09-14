/* User model
 User(id, email, password)
 */

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        }
    );
    return User;
};