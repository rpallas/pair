'use strict';

describe('mvUserDetailCtrl', function(){
    var $controllerCtr, scope, mockUser;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        mockUser = sinon.stub({get: function() {}});
    }));

    it('should set the scope user to the results of mvUser.get(id)', function(){
        var mockUserData = {},
            routeParams = { id: 123 };
        mockUser.get.returns(mockUserData);
        var dependencies = { $scope: scope, mvUser: mockUser, $routeParams: routeParams };
        $controllerCtr('mvUserDetailCtrl', dependencies);
        expect(scope.user).to.equal(mockUserData);
    });

    it('should call mvUser.get and pass it the id from the query params', function(){
        var mockUserData = {},
            routeParams = { id: 123 };
        mockUser.get.returns(mockUserData);
        var dependencies = { $scope: scope, mvUser: mockUser, $routeParams: routeParams };
        $controllerCtr('mvUserDetailCtrl', dependencies);
        expect(mockUser.get.args[0][0]).to.deep.equal({_id: 123});
    });

});