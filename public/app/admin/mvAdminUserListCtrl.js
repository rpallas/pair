'use strict';

angular.module('app').controller('mvAdminUserListCtrl', function($scope, mvUser){
    $scope.users = mvUser.query();
});