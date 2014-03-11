angular.module('app').controller('mvNavbarLoginCtrl', function($scope, mvIdentity, mvNotifier, mvAuth, $location) {
    $scope.identity = mvIdentity;

    /**
     * Authenticates the given credentials and notifies the user
     * of success or failure
     * @param username The users username
     * @param password The users password
     */
    $scope.signin = function(username, password) {
        return mvAuth.authenticateUser(username, password)
            .then(function(success){
                if(success){
                    mvNotifier.notify('You have been successfully signed in');
                } else {
                    mvNotifier.error('Login failed - Incorrect username or password');
                }
            });
    };

    /**
     *
     */
    $scope.signout = function(){
        return mvAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You are now signed out');
            $location.path('/');
        });
    };

});