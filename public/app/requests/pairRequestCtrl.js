'use strict';

angular.module('app').controller('pairRequestCtrl', function($scope, userResource, requestResource, $routeParams, $q, identitySvc, notifierSvc, config, $location){
    $scope.targetUser = userResource.get({_id: $routeParams.id});
    $scope.identity = identitySvc;

    $scope.requestPair = function(message){
        var deferred = $q.defer(),
            request = new requestResource({
                fromUser: {
                    id: identitySvc.currentUser._id,
                    displayName: identitySvc.currentUser.displayName,
                    avatarUrl: identitySvc.currentUser.avatarUrl || config.blankProfileImage
                },
                toUser: {
                    id: $scope.targetUser._id,
                    displayName: $scope.targetUser.displayName,
                    avatarUrl: $scope.targetUser.avatarUrl || config.blankProfileImage
                },
                message: message,
                timeList: $scope.timeList
            });

        request.$save().then(
            function(){ // On success
                notifierSvc.notify("Pair request sent");
                deferred.resolve();
                $location.path('/requests');
            },
            function(response){ // On error
                notifierSvc.error("Error sending pair request");
                deferred.reject(response.data.reason);
            }
        );

        return deferred.promise;
    };

});