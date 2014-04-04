/*jshint expr: true*/
'use strict';

describe('requestListCtrl', function(){
    var $controllerCtr, scope, mockRequest;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        mockRequest = sinon.stub({get: function() {}});
    }));

    it('should set the scope requests to the results of requestResource.get', function(){
//        var mockRequestData = [{}];
//        mockRequest.get.returns(mockRequestData);
//        var dependencies = { $scope: scope, requestResource: mockRequest };
//        $controllerCtr('requestListCtrl', dependencies);
//        expect(scope.requests).to.equal(mockRequestData);
    });

});