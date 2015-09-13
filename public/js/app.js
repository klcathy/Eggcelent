angular.module('eggcelentApp', ['ngAnimate', 'app.routes', 'mainCtrl', 'authService', 'userCtrl',
    'userService', 'restaurantCtrl', 'restaurantService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {
// attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
});