'use strict';

angular.module('app').controller('profileCtrl', function($scope, authSvc, identitySvc, notifierSvc){

    $scope.email = identitySvc.currentUser.username;
    $scope.displayName = identitySvc.currentUser.displayName;
    $scope.skills = identitySvc.currentUser.skills.join(', ');
    $scope.avatarUrl = identitySvc.currentUser.getProfileImage();

    $scope.update = function(){

        var updatedUserData = {
            username: $scope.email,
            displayName: $scope.displayName,
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