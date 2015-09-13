angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/pages/home.html'
        })

        .when('/login', {
            templateUrl: 'views/pages/login.html',
            controller: 'mainController',
            controllerAs: 'login'
        })

        .when('/restaurants', {
            templateUrl: 'views/pages/restaurants/all.html',
            controller: 'restaurantController',
            controllerAs: 'restaurant'
        })

        //.when('/restaurants/create', {
        //    templateUrl: 'views/pages/restaurants/create.html',
        //    controller: 'restaurantController',
        //    controllerAs: 'restaurant'
        //})

        .when('/restaurants/:restaurantId', {
            templateUrl: 'views/pages/restaurants/single.html',
            controller: 'restaurantController',
            controllerAs: 'restaurant'
        });

        $locationProvider.html5Mode(true);
});