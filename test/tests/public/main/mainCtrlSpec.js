/*jshint expr: true*/
'use strict';

describe('mainCtrl', function(){
    var $controllerCtr, scope;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        var dependencies = { $scope: scope };
        $controllerCtr('mainCtrl', dependencies);
    }));

    it('should run', function(){
        expect(scope.user).to.be.ok;
    });

});