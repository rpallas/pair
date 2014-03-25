'use strict';

angular.module('app').controller('userListCtrl', function($scope, userResource){
    $scope.users = userResource.query();

    $scope.sortOptions = [
        { value: "displayName", label: "Sort by Display Name" },
        { value: "status", label: "Sort by Status" },
        { value: "points", label: "Sort by Pair Points" }
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
});