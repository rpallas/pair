/*jshint expr: true*/
'use strict';

describe('userListCtrl', function(){
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
        $controllerCtr('userListCtrl', dependencies);
        expect(scope.users).to.equal(mockUsersData);
    });

    it('should set the sort options', function(){
        var dependencies = { $scope: scope, userResource: mockUser };
        $controllerCtr('userListCtrl', dependencies);
        expect(scope.sortOptions).is.an('array').that.has.length.above(0);
    });

    it('should set the sort order to the first sort option', function(){
        var dependencies = { $scope: scope, userResource: mockUser };
        $controllerCtr('userListCtrl', dependencies);
        expect(scope.sortOrder).to.equal(scope.sortOptions[0].value);
    });

});