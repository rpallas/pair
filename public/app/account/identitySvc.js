'use strict';

angular.module('app').factory('identitySvc', function($window, userResource){
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser = new userResource();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorised: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    };
});