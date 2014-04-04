'use strict';

angular.module('app').controller('userDetailCtrl', function($scope, userResource, requestResource, $routeParams, $q, identitySvc, notifierSvc){
    $scope.user = userResource.get({_id: $routeParams.id});

    $scope.requestPair = function(){
        var dfd = $q.defer(),
            request = new requestResource({
                fromUser: identitySvc.currentUser._id,
                toUser: $routeParams.id
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