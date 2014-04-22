'use strict';

angular.module('app').controller('userListCtrl', function($scope, userResource, identitySvc){
    $scope.users = userResource.query();

    $scope.otherUsers = function(){
        return $scope.users.filter(function(user){
            return user._id !== identitySvc.currentUser._id;
        });
    };

    $scope.hasUsers = function(){
        return $scope.otherUsers().length > 0;
    };

    $scope.sortOptions = [
        { value: "displayName", label: "Sort by Display Name" },
        { value: "status", label: "Sort by Status" },
        { value: "points", label: "Sort by Pair Points" }
    ];

    $scope.sortOrder = $scope.sortOptions[0].value;
});