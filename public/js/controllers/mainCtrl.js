angular.module('mainCtrl', [])

    .controller('mainController', function($rootScope, $location, Auth) {
        var self = this;
        self.user = {};

        // get info if person is logged in
        self.loggedIn = Auth.isLoggedIn();

        // check to see if user is logged in on every request
        // need to change so restaurant view does not require login
        $rootScope.$on('$routeChangeStart', function() {
            self.loggedIn = Auth.isLoggedIn();

            // get user information on route change
            Auth.getUser()
                .then(function(res) {
                    self.user = res.data;
                    console.log(self.user)
                });
        });

        // function to handle login form
        self.doLogin = function() {
            self.processing = true;

            self.error = '';

            // call Auth.login() function
            Auth.login(self.loginData.username, self.loginData.password)
                .success(function(data) {
                    self.processing = false;

                    // if user successfully logs in, redirect to restaurants page
                    if (data.success) {
                        $location.path('/restaurants');
                    }
                    else {
                        self.error = data.message;
                    }
                });
        };

        // function for logging out
        self.doLogout = function() {
            Auth.logout();
            self.user = '';

            // reset user info
            $location.path('/login');
        };

        self.createSample = function() {
            Auth.createSampleUser();
        };
    });
