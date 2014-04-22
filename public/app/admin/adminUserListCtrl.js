'use strict';

angular.module('app').controller('adminUserListCtrl', function($scope, userResource){
    $scope.users = userResource.query();

    $scope.hasUsers = function(){
        return $scope.users.length > 0;
    };
});