/*jshint expr: true*/
"use strict";

describe('dashboardCtrl', function(){
    var $controllerCtr, scope, mockIdentitySvc;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        mockIdentitySvc = {
            currentUser: {
                firstName: 'fname',
                lastName: 'lname',
                username: 'email',
                skills: ['skill 1', 'skill 2'],
                status: "ready to pair",
                points: 100
            }
        };
        $controllerCtr('dashboardCtrl', {
            $scope: scope,
            identitySvc: mockIdentitySvc
        });
    }));

    it('should set the scope email to the current users email', function(){
        expect(scope.email).to.equal(mockIdentitySvc.currentUser.username);
    });

    it('should set the scope firstName to the current users first name', function(){
        expect(scope.firstName).to.equal(mockIdentitySvc.currentUser.firstName);
    });

    it('should set the scope lastName to the current users last name', function(){
        expect(scope.lastName).to.equal(mockIdentitySvc.currentUser.lastName);
    });

    it('should set the scope skills to the current users skills', function(){
        expect(scope.skills).to.equal(mockIdentitySvc.currentUser.skills);
    });

    it('should set the scope status to the current users status', function(){
        expect(scope.status).to.equal(mockIdentitySvc.currentUser.status);
    });

    it('should set the scope points to the current users points', function(){
        expect(scope.points).to.equal(mockIdentitySvc.currentUser.points);
    });

});