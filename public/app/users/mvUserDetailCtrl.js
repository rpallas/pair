angular.module('app').controller('mvUserDetailCtrl', function($scope, mvUser, $routeParams){
    $scope.user = mvUser.get({_id: $routeParams.id});
});