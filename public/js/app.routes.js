angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/pages/home.html',
            controller: 'homeController',
            controllerAs: 'home'
        });

        $locationProvider.html5Mode(true);
});