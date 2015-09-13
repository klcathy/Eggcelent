angular.module('userService', [])
.factory('User', function($http) {

        var userFactory = {};

        // get all users
        userFactory.all = function() {
            return $http.get('/app/users/');
        };

        // create a restaurant
        userFactory.create = function(resData) {
            return $http.post('/app/users/', resData);
        };

        // show a single restaurant
        userFactory.get = function(id) {
            return $http.get('/app/users/' + id);
        };

        // update a restaurant
        userFactory.update = function(id, resData) {
            return $http.put('/app/users/' + id, resData);
        };

        // delete a restaurant
        userFactory.delete = function(id) {
            return $http.delete('/app/users/' + id);
        };

        return userFactory;
    });