/* Restaurant model
 Restaurant(Name, Rating, Price Range, Cuisine, Category, Street Address, City, State, Phone number, Website)
 */

module.exports = function(sequelize, DataTypes) {
    var Restaurant = sequelize.define('Restaurant', {
            name: {
                type: DataTypes.STRING,
                allownull: false,
            },
            rating: DataTypes.DECIMAL,
            priceRange: DataTypes.INTEGER,
            cuisine: DataTypes.STRING,
            category: DataTypes.STRING,
            streetAddress: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            phone: DataTypes.STRING,
            website: DataTypes.STRING,
        }, {
            associate: function(models) {
                Restaurant.hasMany(models.Category);
            }

        }
    );
    return Restaurant;
};
