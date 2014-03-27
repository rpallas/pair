'use strict';

angular.module('app').controller('signupCtrl', function($scope, notifierSvc, $location, authSvc){

    /**
     * Updates the users email address
     */
    $scope.submitEmail = function(){
        var data = { username: $scope.email };
        authSvc.updateCurrentUser(data);
        $location.path('/dashboard');
    };

    /**
     * Creates a new user from the form values
     */
    $scope.signup = function(){
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            displayName: $scope.displayName
        };

        authSvc.createUser(newUserData).then(
            function(){ // On success
                notifierSvc.notify('New user account created!');
                $location.path('/');
            },
            function(reason){ // On error
                notifierSvc.error(reason);
            }
        );
    };

});