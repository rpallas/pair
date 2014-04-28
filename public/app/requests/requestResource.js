"use strict";

angular.module('app').factory('requestResource', function($resource){
    var RequestResource = $resource('/api/requests/:_id', {_id: "@id", state: "@state"}, {
        update: {method:'PUT', isArray:false }
    });

    return RequestResource;
});

angular.module('app').factory('userRequestResource', function($resource){
    var userRequestResource = $resource('/api/user/:userId/requests/:requestId', {userId: "@userId", requestId: "@requestId", limit: "@limit", sort: "@sort"}, {
        get: {method:'GET', isArray:true }
    });

    return userRequestResource;
});

angular.module('app').factory('receivedRequestsResource', function($resource){
    var receivedRequestsResource = $resource('/api/user/:userId/received', {userId: "@userId", limit: "@limit"}, {
        get: {method:'GET', isArray:true }
    });

    return receivedRequestsResource;
});

angular.module('app').factory('sentRequestsResource', function($resource){
    var sentRequestsResource = $resource('/api/user/:userId/sent', {userId: "@userId", limit: "@limit"}, {
        get: {method:'GET', isArray:true }
    });

    return sentRequestsResource;
});