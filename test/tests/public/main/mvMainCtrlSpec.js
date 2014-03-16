/*jshint expr: true*/
'use strict';

describe('mvMainCtrl', function(){
    var $controllerCtr, scope, mockUser;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        var dependencies = { $scope: scope };
        $controllerCtr('mvMainCtrl', dependencies);
    }));

    // TODO - write real features and specs
    it('should run', function(){
        expect(scope.user).to.be.ok;
    });


});