/*jshint expr: true*/
'use strict';

describe('userResource', function(){
    beforeEach(module('app'));

    describe('isAdmin', function(){

        it("should return false if the roles array does not have an admin entry", inject(function(userResource){
            var user = new userResource();
            user.roles = ["not admin"];
            expect(user.isAdmin()).to.be.falsy;
        }));

        it("should return true if the roles array has an admin entry", inject(function(userResource){
            var user = new userResource();
            user.roles = ["admin"];
            expect(user.isAdmin()).to.be.true;
        }));

    });
});