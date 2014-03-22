/*jshint expr: true*/
'use strict';

describe('userDetailCtrl', function(){
    var $controllerCtr, scope, mockUser;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        mockUser = sinon.stub({get: function() {}});
    }));

    it('should set the scope user to the results of userResource.get(id)', function(){
        var mockUserData = {},
            routeParams = { id: 123 };
        mockUser.get.returns(mockUserData);
        var dependencies = { $scope: scope, userResource: mockUser, $routeParams: routeParams };
        $controllerCtr('userDetailCtrl', dependencies);
        expect(scope.user).to.equal(mockUserData);
    });

    it('should call userResource.get and pass it the id from the query params', function(){
        var mockUserData = {},
            routeParams = { id: 123 };
        mockUser.get.returns(mockUserData);
        var dependencies = { $scope: scope, userResource: mockUser, $routeParams: routeParams };
        $controllerCtr('userDetailCtrl', dependencies);
        expect(mockUser.get.args[0][0]).to.deep.equal({_id: 123});
    });

});