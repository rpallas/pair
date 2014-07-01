'use strict';

angular.module('app').controller('requestDetailCtrl', function($scope, requestResource, $routeParams){

    $scope.request = requestResource.get({_id: $routeParams.id}, function (request) {

        $scope.setAccepted = function (timeListItem, callback) {

            request.$save().then(
                function(){ // On success
                    notifierSvc.notify("Time accepted");
                },
                function(response){ // On error
                    notifierSvc.error("Error accepting time");
                }
            );
        };
    });

});
