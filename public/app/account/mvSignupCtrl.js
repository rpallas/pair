angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth){

    $scope.signup = function(){
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        };

        mvAuth.createUser(newUserData).then(
            function(){ // On success
                mvNotifier.notify('New user account created!');
                $location.path('/');
            },
            function(reason){ // On error
                mvNotifier.error(reason);
            }
        );
    };

});