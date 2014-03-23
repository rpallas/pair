/*jshint expr: true*/
"use strict";

describe('dashboardCtrl', function(){
    var $controllerCtr, scope;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        var dependencies = { $scope: scope };
        $controllerCtr('dashboardCtrl', dependencies);
    }));

    it('should run', function(){
        expect(scope.user).to.be.ok;
    });

});