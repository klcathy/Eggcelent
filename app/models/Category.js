/* Category model
 Category(Restaurant ID, Category)
 */

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
            category: DataTypes.STRING,
        }, {
            associate: function(models) {
                Category.belongsTo(models.Restaurant);
            }
        }
    );
    return Category;
};
