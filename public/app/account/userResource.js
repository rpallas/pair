'use strict';

angular.module('app').factory('userResource', function($resource){
    var UserResource = $resource('/api/users/:_id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false }
    });

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    UserResource.prototype.getProfileImage = function() {
        return this.avatarUrl || "https://s3-eu-west-1.amazonaws.com/pair-app/blank-profile.png";
    };

    return UserResource;
});