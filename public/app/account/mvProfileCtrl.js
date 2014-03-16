'use strict';

angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier){

    $scope.email = mvIdentity.currentUser.username;
    $scope.firstName = mvIdentity.currentUser.firstName;
    $scope.lastName = mvIdentity.currentUser.lastName;
    $scope.skills = mvIdentity.currentUser.skills.join(', ');

    $scope.update = function(){

        var updatedUserData = {
            username: $scope.email,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            skills: $scope.skills.split(', ')
        };

        if($scope.password && $scope.password.length > 0){
            updatedUserData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(updatedUserData).then(
            function(){
                mvNotifier.notify('Your user profile has been updated');
            },
            function(reason){
                mvNotifier.error(reason);
            }
        );

    };

});