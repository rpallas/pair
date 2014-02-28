angular.module('app').controller('mvBrowseDetailCtrl', function($scope, mvUser, $routeParams){
    $scope.user = mvUser.get({_id: $routeParams.id});
});