"use strict";

angular.module('app').factory('requestResource', function($resource){
    var RequestResource = $resource('/api/requests/:toUser', {toUser: "@toUser"}, {
        get: {method:'GET', isArray:true }
    });

    return RequestResource;
});