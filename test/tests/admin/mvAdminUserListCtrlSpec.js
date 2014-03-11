'use strict';

describe('mvAdminUserListCtrl', function(){
    var $controllerCtr, scope, mockUser;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        mockUser = sinon.stub({query: function() {}});
    }));

    it('should set the scope users to the results of mvUser.query', function(){
        var mockUsersData = {};
        mockUser.query.returns(mockUsersData);
        var dependencies = { $scope: scope, mvUser: mockUser };
        $controllerCtr('mvAdminUserListCtrl', dependencies);
        expect(scope.users).to.equal(mockUsersData);
    });

});