var Sequelize = require('sequelize');
var fs        = require('fs');
var _         = require('lodash');
var db        = {};

// SEQUELIZE CONFIGUARTION =============================================
// create an instance of sequelize
var sequelize = new Sequelize('development', 'root', '', {
    host   : 'localhost',
    port   : 3306,
    dialect: 'mysql',
});

// check database connection
sequelize.authenticate().then(function (err) {
    if (err) {
        console.log('Unable to connect to the database:', err);
    } else {
        console.log('Connection has been established successfully.');
    }
});

// import model files and save model names
var models = ['Restaurant'];

models.forEach(function (model) {
    var model      = sequelize.import('../app/models/' + model);
    db[model.name] = model;
});

// sync all models that aren't already in database
sequelize.sync();

// export sequelize variables
module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);