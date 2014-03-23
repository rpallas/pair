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

    // Doesn't do anything yet - just static content

});