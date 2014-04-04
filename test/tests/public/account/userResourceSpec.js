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

    describe('getProfileImage', function(){

        it("should return the users avitarUrl if they have one", inject(function(userResource){
            var user = new userResource();
            user.avatarUrl = "url/to/avatar";
            expect(user.getProfileImage()).to.equal(user.avatarUrl);
        }));

        it("should return url to blank profile image if the user has no avatarUrl", inject(function(userResource){
            var user = new userResource();
            user.avatarUrl = "";
            expect(user.getProfileImage()).to.equal("https://s3-eu-west-1.amazonaws.com/pair-app/blank-profile.png");
        }));

    });

});