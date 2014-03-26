"use strict";

angular.module('app').controller('dashboardCtrl', function($scope, identitySvc) {

    $scope.email = identitySvc.currentUser.username;
    $scope.displayName = identitySvc.currentUser.displayName;
    $scope.skills = identitySvc.currentUser.skills;
    $scope.status = identitySvc.currentUser.status;
    $scope.points = identitySvc.currentUser.points;
    $scope.avatarUrl = identitySvc.currentUser.avatarUrl;

    // Sample data
    $scope.activityFeedItems = [
        {text: "Something happened", published: new Date()},
        {text: "Something else happened", published: new Date()},
        {text: "And more stuff happened", published: new Date()},
        {text: "More stuff", published: new Date()},
        {text: "stuff", published: new Date()}
    ];

});