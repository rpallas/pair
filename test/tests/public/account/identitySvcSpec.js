/*jshint expr: true*/
'use strict';

describe('identitySvc', function(){
    var window, identity, currentUser;

    beforeEach(module('app'));

    beforeEach(inject(function($window, identitySvc, userResource){
        window = $window;
        window.bootstrappedUserObject = {displayName:'anything'};
        identity = identitySvc;
        currentUser = new userResource();
    }));

    describe('isAuthenticated', function(){

        it('should return true if there is a currentUser', function(){
            identity.currentUser = {name: 'test'};
            var result = identity.isAuthenticated();
            expect(result).to.be.true;
        });

        it('should return false if there is NOT a currentUser', function(){
            identity.currentUser = undefined;
            var result = identity.isAuthenticated();
            expect(result).to.be.false;
        });

    });

    describe('isAuthorised', function(){

        it('should return true if the currentUser has the required role', function(){
            identity.currentUser = {roles: ['admin']};
            var result = identity.isAuthorised('admin');
            expect(result).to.be.true;
        });

        it('should return false if the currentUser does not have the required role', function(){
            identity.currentUser = {roles: []};
            var result = identity.isAuthorised('admin');
            expect(result).to.be.false;
        });

    });

});