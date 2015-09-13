angular.module('authService', [])

// factory to login and get information
// inject $http to communicate with API
// inject $q to return promise objects
// inject AuthToken to manage tokens
.factory('Auth', function($http, $q, AuthToken) {
    var authFactory = {};

    // login user
    authFactory.login = function(username, password) {
        // return promise object and its data
        return $http.post('/app/authenticate', {
            username: username,
            password: password
        }).success(function(data) {
            AuthToken.setToken(data.token);
            return data;
            });
    };

    authFactory.logout = function() {
        // clear token
        AuthToken.setToken();
    };

    // check if user is logged in
    // check if there is a local token
    authFactory.isLoggedIn = function() {
        if(AuthToken.getToken())
            return true;
        else
            return false;
    };

    // get the logged in user
    authFactory.getUser = function() {
        if (AuthToken.getToken())
            return $http.get('/app/me', {cache: true});
        else
            return $q.reject({ message: 'User has no token.'});
    };

    authFactory.createSampleUser = function() {
        $http.post('/app/sample');
    };

    return authFactory;
})

// factory to handle tokens
// inject $window to store token client-side
.factory('AuthToken', function($window) {
    var authTokenFactory = {};

    // get token out of local storage
    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    // function to set or clear token
    // if token is passed, set token
    // if there is no token, clear it from local storage
    authTokenFactory.setToken = function(token) {
        if (token)
            $window.localStorage.setItem('token', token);
        else
            $window.localStorage.removeItem('token');
    };

    return authTokenFactory;
})

// app config to integrate token into requests
.factory('AuthInterceptor', function($q, $location, AuthToken) {
    var interceptorFactory = {};

    // this will happen to all HTTP requests
    interceptorFactory.request = function(config) {
        //grab token
        var token = AuthToken.getToken();

        // if token exists, add to header as x-access-token
        if (token)
            config.headers['x-access-token'] = token;

        return config;
    };

    interceptorFactory.responseError = function(res) {
        // if server returns 403 forbidden response
        if (res.status == 403) {
            AuthToken.setToken();
            $location.path('/login');
        }

        // return error from service as promise
        return $q.reject(res);
    };

    return interceptorFactory;
});