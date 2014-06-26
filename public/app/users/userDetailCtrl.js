'use strict';

angular.module('app').controller('userDetailCtrl', function($scope, userResource, requestResource, $routeParams, $q, identitySvc, notifierSvc, config){
    $scope.user = userResource.get({_id: $routeParams.id});

    $scope.isCurrentUser = function(){
        if(identitySvc.currentUser){
            return $routeParams.id === identitySvc.currentUser._id;
        }
        return false;
    };

    $scope.requestPair = function(){
        var dfd = $q.defer(),
            request = new requestResource({
                fromUser: {
                    id: identitySvc.currentUser._id,
                    displayName: identitySvc.currentUser.displayName,
                    avatarUrl: identitySvc.currentUser.avatarUrl || config.blankProfileImage
                },
                toUser: {
                    id: $scope.user._id,
                    displayName: $scope.user.displayName,
                    avatarUrl: $scope.user.avatarUrl || config.blankProfileImage
                }
            });

        request.$save().then(
            function(){ // On success
                notifierSvc.notify("Pair request sent");
                dfd.resolve();
            },
            function(response){ // On error
                notifierSvc.error("Error sending pair request");
                dfd.reject(response.data.reason);
            }
        );

        return dfd.promise;
    };
});