/*jshint expr:true, -W079*/
"use strict";

var expect = require('chai').expect,
    sinon = require('sinon'),
    passport = require('passport'),
    serverPath = '../../../../server/',
    auth = require(serverPath + 'config/auth');

describe('auth', function () {

    var reqStub, resStub, nextSpy;

    beforeEach(function(){
        reqStub = sinon.stub({
            isAuthenticated: function(){},
            user: {roles: ["guest"]},
            body: { username: "Rob" }
        });
        resStub = sinon.stub({ status: function(){}, end: function(){}, send: function(){}});
        nextSpy = sinon.spy();
    });

    describe('authenticate', function(){
        var fnDone, passportAuthSpy;

        beforeEach(function(){
            passportAuthSpy = sinon.spy(function(req, res, next){ fnDone(); });
            reqStub = sinon.stub({
                body: { username: "Rob" },
                logIn: function(user, callback){ callback(); }
            });
        });

        afterEach(function(){
            passport.authenticate.restore();
        });

        it('should send a failed response if there is no username in request body', function(){
            sinon.stub(passport, 'authenticate', function(type, callback){
                callback(null, undefined);
                return passportAuthSpy;
            });
            reqStub = sinon.stub({
                body: { },
                logIn: function(user, callback){ callback(); }
            });
            auth.authenticate(reqStub, resStub, nextSpy);
            expect(resStub.send.calledWith({ success:false })).to.be.true;
        });

        it('should lowercase the provided username for comparison', function(done){
            fnDone = done;
            sinon.stub(passport, 'authenticate', function(type, callback){
                callback(null, undefined);
                return passportAuthSpy;
            });
            auth.authenticate(reqStub, resStub, nextSpy);
            expect(passportAuthSpy.args[0][0].body).to.deep.equal({ username: "rob" });
        });

        it('should send a failed response if there is no user', function(done){
            fnDone = done;
            sinon.stub(passport, 'authenticate', function(type, callback){
                callback(null, undefined);
                return passportAuthSpy;
            });
            auth.authenticate(reqStub, resStub, nextSpy);
            expect(resStub.send.calledWith({ success:false })).to.be.true;
        });

        it('should call the requests logIn function if there is a user', function(done){
            fnDone = done;
            sinon.stub(passport, 'authenticate', function(type, callback){
                callback(null, {username:"anything"});
                return passportAuthSpy;
            });
            auth.authenticate(reqStub, resStub, nextSpy);
            expect(reqStub.logIn.called).to.be.true;
        });

        // TODO
//        it('sçhould send a success response if the login details are correct', function(done){
//            fnDone = done;
//            var user = {username:"anything"};
//            sinon.stub(passport, 'authenticate', function(type, callback){
//                callback(null, user);
//                return passportAuthSpy;
//            });
//            auth.authenticate(reqStub, resStub, nextSpy);
//            expect(resStub.send.called).to.be.true;
//            expect(resStub.send.args[0][1]).to.deep.equal({ success: true, user: user });
//        });

    });

    describe('requiresApiLogin', function(){

        it('should respond with a 403 if the user is not authenticated', function(){
            reqStub.isAuthenticated.returns(false);
            auth.requiresApiLogin(reqStub, resStub, nextSpy);
            expect(resStub.status.calledWith(403)).to.be.true;
            expect(resStub.end.called).to.be.true;
        });

        it('should call `next` if the user is authenticated', function(){
            reqStub.isAuthenticated.returns(true);
            auth.requiresApiLogin(reqStub, resStub, nextSpy);
            expect(nextSpy.called).to.be.true;
        });

    });

    describe('requiresRole', function(){

        it('should return a function', function(){
            var result = auth.requiresRole("role");
            expect(result).to.be.a('function');
        });

        it('should respond with a 403 if the user is not authenticated', function(){
            reqStub.isAuthenticated.returns(false);
            auth.requiresRole("role")(reqStub, resStub, nextSpy);
            expect(resStub.status.calledWith(403)).to.be.true;
            expect(resStub.end.called).to.be.true;
        });

        it('should respond with a 403 if the user does not have the required role', function(){
            reqStub.isAuthenticated.returns(true);
            auth.requiresRole("role")(reqStub, resStub, nextSpy);
            expect(resStub.status.calledWith(403)).to.be.true;
            expect(resStub.end.called).to.be.true;
        });

        it('should call `next` if the user is authenticated and they have the required role', function(){
            reqStub.isAuthenticated.returns(true);
            auth.requiresRole("guest")(reqStub, resStub, nextSpy);
            expect(nextSpy.called).to.be.true;
        });

    });

});