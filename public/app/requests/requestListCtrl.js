"use strict";

angular.module('app').controller('requestListCtrl', function($scope, userRequestResource, requestResource, identitySvc, notifierSvc) {
    $scope.requests = userRequestResource.get({ userId: identitySvc.currentUser._id });

    $scope.receivedRequests = function(){
        return $scope.requests.filter(function(request){
            if(identitySvc.currentUser === undefined) {
                return false;
            }
            return request.toUser.id === identitySvc.currentUser._id;
        }).sort(sortByRequestDate);
    };

    $scope.hasReceivedRequests = function(){
        return $scope.receivedRequests().length > 0;
    };

    $scope.sentRequests = function(){
        return $scope.requests.filter(function(request){
            if(identitySvc.currentUser === undefined) {
                return false;
            }
            return request.fromUser.id === identitySvc.currentUser._id;
        }).sort(sortByRequestDate);
    };

    $scope.hasSentRequests = function(){
        return $scope.sentRequests().length > 0;
    };


    $scope.acceptRequest = function(request){
        updateRequestState(request, "Accepted");
    };

    $scope.rejectRequest = function(request){
        updateRequestState(request, "Rejected");
    };

    $scope.rescheduleRequest = function(request){
        //TODO
        updateRequestState(request, "Reschedule");
    };

    $scope.deleteRequest = function(request){

    };

    $scope.initTooltips = function(){
        $('[data-toggle=tooltip]').tooltip({ placement: 'bottom'});
    };

    function updateRequestState(request, state){
        var clone = new requestResource();
        angular.extend(clone, request);
        clone.$update({state: state}).then(
            function(data){
                notifierSvc.notify("Request state changed to '"+state+"'");
                request.state = state;
            },
            function(response){
                notifierSvc.error("Error while accepting request");
                console.log("Reason: " + response.data.reason);
            }
        );
    }

    function sortByRequestDate(requestA, requestB){
        return new Date(requestB.sentDateTime) - new Date(requestA.sentDateTime);
    }

});