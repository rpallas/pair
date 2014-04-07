"use strict";

angular.module('app').factory('requestResource', function($resource){
    var RequestResource = $resource('/api/requests/:userId', {userId: "@userId"}, {
        get: {method:'GET', isArray:true }
    });

    return RequestResource;
});