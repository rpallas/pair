'use strict';

angular.module('app').controller('userDetailCtrl', function($scope, userResource, $routeParams){
    $scope.user = userResource.get({_id: $routeParams.id});
});