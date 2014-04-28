"use strict";

angular.module('app').controller('dashboardCtrl', function($scope, identitySvc, userRequestResource, $window) {

    var _ = $window._;
    $scope.email = identitySvc.currentUser.username;
    $scope.displayName = identitySvc.currentUser.displayName;
    $scope.skills = identitySvc.currentUser.skills;
    $scope.status = identitySvc.currentUser.status;
    $scope.points = identitySvc.currentUser.points;

    $scope.requests = userRequestResource
        .query({userId:identitySvc.currentUser._id, limit: 5, sort: 'descending'}, function(data){
            // Add display fields to each request for if it was sent or received
            _.each(data, function(request){
                if(request.toUser.id === identitySvc.currentUser._id){
                    request.direction = 'received';
                    request.otherUser = request.fromUser;
                } else {
                    request.direction = 'sent';
                    request.otherUser = request.toUser;
                }
            });
        });

    // Sample data
    $scope.activityFeedItems = [
        {text: "Something happened", published: new Date()},
        {text: "Something else happened", published: new Date()},
        {text: "And more stuff happened", published: new Date()},
        {text: "More stuff", published: new Date()},
        {text: "stuff", published: new Date()}
    ];

});