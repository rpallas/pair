angular.module('app').controller('mvNavbarLoginCtrl', function($scope, $http) {
    $scope.signin = function(username, password) {
        $http.post('/login', {username: username, password: password })
            .then(function(response){
                if(response.data.success){
                    console.log('login successful');
                } else {
                    console.log('login failed');
                }
            });
    }
});