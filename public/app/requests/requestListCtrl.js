"use strict";

angular.module('app').controller('requestListCtrl', function($scope, requestResource, identitySvc, notifierSvc) {
    $scope.requests = requestResource.get({ userId: identitySvc.currentUser._id });

    $scope.receivedRequests = function(){
        return $scope.requests.filter(function(request){
            if(identitySvc.currentUser === undefined) {
                return false;
            }
            return request.toUser.id === identitySvc.currentUser._id;
        });
    };

    $scope.sentRequests = function(){
        return $scope.requests.filter(function(request){
            if(identitySvc.currentUser === undefined) {
                return false;
            }
            return request.fromUser.id === identitySvc.currentUser._id;
        });
    };

    $scope.acceptRequest = function(requestId){

    };

    $scope.rejectRequest = function(requestId){

    };

    $scope.rescheduleRequest = function(requestId){

    };

    $scope.deleteRequest = function(requestId){

    };

    $scope.initTooltips = function(){
        $('[data-toggle=tooltip]').tooltip({ placement: 'bottom'});
    };

});