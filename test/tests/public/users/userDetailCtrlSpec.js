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

    describe('$scope.isCurrentUser', function(){

        var mockUserData, mockIdentitySvc, dependencies;

        beforeEach(function(){
            mockIdentitySvc = { currentUser: { _id: 123456 } };
            mockUserData = {};
            mockUser.get.returns(mockUserData);
            dependencies = { $scope: scope, userResource: mockUser, identitySvc: mockIdentitySvc };
        });

        it('should return true if this is the current users profile view', function(){
            dependencies.$routeParams = { id: mockIdentitySvc.currentUser._id };
            $controllerCtr('userDetailCtrl', dependencies);
            var result = scope.isCurrentUser();
            expect(result).to.be.true;
        });

        it('should return false if this is not the current users profile view', function(){
            dependencies.$routeParams = { id: 999 };
            $controllerCtr('userDetailCtrl', dependencies);
            var result = scope.isCurrentUser();
            expect(result).to.be.false;
        });

    });

});