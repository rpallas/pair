'use strict';

angular.module('app').controller('mvMainCtrl', function($scope) {
    // Sample data
    $scope.activityFeedItems = [
        {text: "Something happened", published: new Date()},
        {text: "Something else happened", published: new Date()},
        {text: "And more stuff happened", published: new Date()},
        {text: "More stuff", published: new Date()},
        {text: "stuff", published: new Date()}
    ];
    $scope.user = {
        name: "Jane Doe",
        points: 2500,
        status: "available to pair now",
        languages: ["C#", "Javascript", "Php"],
        email: "robbie@test.com"
    };
});