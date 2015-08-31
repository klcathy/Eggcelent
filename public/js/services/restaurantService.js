angular.module('restaurantService', [])
    .factory('Restaurants', function($http) {
        var resFactory = {};

        // get all restaurants
        resFactory.list = function() {
            return $http.get('/app/restaurants/');
        };

        // create a restaurant
        resFactory.create = function(resData) {
            return $http.post('/app/restaurants/', resData);
        };

        // show a single restaurant
        resFactory.show = function(id) {
            return $http.get('/app/restaurants/' + id);
        };

        // update a restaurant
        resFactory.update = function(id, resData) {
            return $http.put('/app/restaurants/' + id, resData);
        };

        // delete a restaurant
        resFactory.delete = function(id) {
            return $http.delete('/app/restaurants/' + id);
        };

        return resFactory;
});