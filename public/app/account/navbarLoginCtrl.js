'use strict';

angular.module('app').controller('navbarLoginCtrl', function($scope, identitySvc, notifierSvc, authSvc, $location) {
    $scope.identity = identitySvc;

    /**
     * Authenticates the given credentials and notifies the user
     * of success or failure
     * @param username The users username
     * @param password The users password
     */
    $scope.signin = function(username, password) {
        return authSvc.authenticateUser(username, password)
            .then(authCallback);
    };

    /**
     * Sign the user out
     */
    $scope.signout = function(){
        return authSvc.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            notifierSvc.notify('You are now signed out');
            $location.path('/');
        });
    };

    /**
     * Callback function for authentication
     * @param success bool was the user login successful
     */
    function authCallback(success){
        if(success){
            $location.path('/dashboard');
            notifierSvc.notify('You have been successfully signed in');
        } else {
            notifierSvc.error('Login failed - Incorrect username or password');
        }
    }

});