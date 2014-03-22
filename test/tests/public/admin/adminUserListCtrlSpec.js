/*jshint expr: true*/
'use strict';

describe('adminUserListCtrl', function(){
    var $controllerCtr, scope, mockUser;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        mockUser = sinon.stub({query: function() {}});
    }));

    it('should set the scope users to the results of userResource.query', function(){
        var mockUsersData = {};
        mockUser.query.returns(mockUsersData);
        var dependencies = { $scope: scope, userResource: mockUser };
        $controllerCtr('adminUserListCtrl', dependencies);
        expect(scope.users).to.equal(mockUsersData);
    });

});