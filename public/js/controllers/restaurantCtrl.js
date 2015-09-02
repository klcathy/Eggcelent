angular.module('restaurantCtrl', [])

.controller('restaurantController', function (Restaurants) {
    var self = this;

    Restaurants.list()
        .success(function(data) {
            self.restaurants = data;
        });

    self.newRestaurant = function() {
        Restaurants.create(self.resData)
            .success(function(data) {
                self.resData = {};
                self.message = data.message;
            });
    };
});
