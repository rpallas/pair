'use strict';

angular.module('app').controller('profileCtrl', function($scope, authSvc, identitySvc, notifierSvc){

    $scope.email = identitySvc.currentUser.username;
    $scope.firstName = identitySvc.currentUser.firstName;
    $scope.lastName = identitySvc.currentUser.lastName;
    $scope.skills = identitySvc.currentUser.skills.join(', ');

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

        authSvc.updateCurrentUser(updatedUserData).then(
            function(){
                notifierSvc.notify('Your user profile has been updated');
            },
            function(reason){
                notifierSvc.error(reason);
            }
        );

    };

});