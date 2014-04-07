'use strict';

angular.module('app').factory('userResource', function($resource, config){
    var UserResource = $resource('/api/users/:_id', {_id: "@id"}, {
        update: {method:'PUT', isArray:false }
    });

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    UserResource.prototype.getProfileImage = function() {
        return this.avatarUrl || config.blankProfileImage;
    };

    return UserResource;
});