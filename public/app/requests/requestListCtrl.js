"use strict";

angular.module('app').controller('requestListCtrl', function($scope, requestResource, identitySvc, notifierSvc) {
    $scope.requests = requestResource.get({ toUser: identitySvc.currentUser._id });


});