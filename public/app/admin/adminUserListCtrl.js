'use strict';

angular.module('app').controller('adminUserListCtrl', function($scope, userResource){
    $scope.users = userResource.query();
});