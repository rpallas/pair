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
            .then(function(success){
                if(success){
                    notifierSvc.notify('You have been successfully signed in');
                } else {
                    notifierSvc.error('Login failed - Incorrect username or password');
                }
            });
    };

    /**
     *
     */
    $scope.signout = function(){
        return authSvc.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            notifierSvc.notify('You are now signed out');
            $location.path('/');
        });
    };

});