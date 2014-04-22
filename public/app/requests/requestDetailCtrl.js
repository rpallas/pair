'use strict';

angular.module('app').controller('requestDetailCtrl', function($scope, requestResource, $routeParams){
    $scope.request = requestResource.get({_id: $routeParams.id});


});