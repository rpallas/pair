"use strict";

angular.module('app').factory('requestResource', function($resource){
    var RequestResource = $resource('/api/requests/:userId', {_id: "@id"}, {
        get: {method:'GET', isArray:true }
    });

    return RequestResource;
});