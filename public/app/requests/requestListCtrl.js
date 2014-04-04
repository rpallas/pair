"use strict";

angular.module('app').controller('requestListCtrl', function($scope, requestResource, identitySvc, notifierSvc) {
    $scope.requests = requestResource.get({ userId: identitySvc.currentUser.id });


});