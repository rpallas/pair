"use strict";

angular.module('app').factory('requestResource', function($resource){
    var RequestResource = $resource('/api/requests/:_id', {_id: "@id", state: "@state"}, {
        get: {method:'GET', isArray:true },
        update: {method:'PUT', isArray:false }
    });

    return RequestResource;
});

angular.module('app').factory('userRequestResource', function($resource){
    var userRequestResource = $resource('/api/user/:userId/requests/:requestId', {userId: "@userId", requestId: "@requestId"}, {
        get: {method:'GET', isArray:true }
    });

    return userRequestResource;
});