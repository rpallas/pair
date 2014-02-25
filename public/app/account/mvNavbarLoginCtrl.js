angular.module('app').controller('mvNavbarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password)
            .then(function(success){
                if(success){
                    mvNotifier.notify('You have been successfully signed in');
                } else {
                    mvNotifier.notify('Login failed - Incorrect username or password');
                }
            });
    }
});