'use strict';

angular.module('app').controller('userDetailCtrl', function($scope, userResource, requestResource, $routeParams, $q, identitySvc){
    $scope.user = userResource.get({_id: $routeParams.id});

    $scope.requestPair = function(){
        var newRequestData = {
                fromUser: identitySvc.currentUser._id,
                toUser: $routeParams.id
            },
            dfd = $q.defer(),
            request = new requestResource(newRequestData);
        request.$save().then(
            function(){ // On success
                console.log("Request sent");
                dfd.resolve();
            },
            function(response){ // On error
                dfd.reject(response.data.reason);
            }
        );
        return dfd.promise;
    };
});