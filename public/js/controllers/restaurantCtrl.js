angular.module('restaurantCtrl', [])

.controller('restaurantController', function (Restaurants) {
    var self = this;

    Restaurants.list()
        .success(function(data) {
            self.restaurants = data;
        });

    self.createRestaurant = function() {
        Restaurants.create(self.resData)
            .success(function(data) {
                self.resData = {};
                self.message = data.message;
            });
    };

    self.deleteRestaurant = function(id) {
        Restaurants.delete(id)
            .success(function(data) {
                self.message = data.message;
                Restaurants.list()
                    .success(function(data) {
                        // return updated list of restaurants;
                        self.restaurants = data;
                    });
            });
    };
});
