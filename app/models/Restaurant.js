////var Sequelize = require('sequelize');
//
///* Restaurant model
// Restaurant(Name, Rating, Price Range, Cuisine, Category, Street Address, City, State, Phone number, Website)
// */
//module.exports = function(sequelize, DataTypes) {
//    var Restaurant = sequelize.define('Restaurant', {
//            name: {
//                type: Sequelize.STRING,
//                allownull: false,
//            },
//            rating: Sequelize.DECIMAL,
//            priceRange: Sequelize.INTEGER,
//            cuisine: Sequelize.STRING,
//            category: Sequelize.STRING,
//            streetAddress: Sequelize.STRING,
//            city: Sequelize.STRING,
//            state: Sequelize.STRING,
//            phone: Sequelize.STRING,
//            website: Sequelize.STRING,
//        }, {
//            associate: function(models) {
//                Restaurant.hasMany(models.Category);
//            }
//
//        }
//    );
//    return Restaurant;
//};
//
