angular.module('eggcelentApp', ['app.routes', 'mainCtrl'])

//.controller('mainController', function() {
//    var self = this;
//
//    self.message = 'This controller is working yayyy!';
//})

.controller('homeController', function() {
    var self = this;

    self.message = 'This is the home page';
})

.controller('restaurantController', function (Restaurants) {
    var self = this;

    Restaurants.list()
        .success(function(data) {
            self.restaurants = data;
        });
});