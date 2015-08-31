angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/pages/home.html'
        })

        .when('/restaurants', {
            templateUrl: 'views/pages/restaurants/all.html',
            controller: 'restaurantController',
            controllerAs: 'restaurant'
        });

        $locationProvider.html5Mode(true);
});