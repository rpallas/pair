angular.module('app').controller('mvNavbarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password)
            .then(function(success){
                if(success){
                    mvNotifier.notify('You have been successfully signed in');
                } else {
                    mvNotifier.error('Login failed - Incorrect username or password');
                }
            });
    };
    $scope.signout = function(){
        mvAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify("You are now signed out");
            $location.path("/");
        });
    }
});