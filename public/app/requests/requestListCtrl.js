"use strict";

angular.module('app').controller('requestListCtrl', function($scope, requestResource, identitySvc, notifierSvc) {
    $scope.requests = requestResource.get({ userId: identitySvc.currentUser._id });

    $scope.receivedRequests = function(){
        return $scope.requests.filter(function(request){
            return request.toUser === identitySvc.currentUser._id;
        })
    };

    $scope.sentRequests = function(){
        return $scope.requests.filter(function(request){
            return request.fromUser === identitySvc.currentUser._id;
        })
    };

});