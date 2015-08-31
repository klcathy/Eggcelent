angular.module('restaurantCtrl', [])

.controller('restaurantController', function (Restaurants) {
    var self = this;
    console.log('In restaurantCtrl');

    Restaurants.list()
        .success(function(data) {
            self.restaurants = data;
        });
});
