/*jshint expr:true, -W079*/
"use strict";

var serverPath = '../../../../server/',
    userModel = require(serverPath + 'models/User'),
    users = require(serverPath + 'controllers/users'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    sandbox = require('sandboxed-module');

describe('users controller', function (){
    var reqStub, resStub;

    beforeEach(function(){
        reqStub = sinon.stub({
            isAuthenticated: function(){},
            user: {
                hasRole: function(role){},
                id: '123',
                username: '',
                displayName: '',
                password: '',
                skills: [],
                roles: ["guest"]
            },
            body: {
                _id: '123',
                username: 'jb@test.com',
                displayName: 'Joe Blogs',
                password: 'password',
                skills: ['skill1', 'skill2', 'skill3']
            }
        });
        resStub = sinon.stub({ status: function(){}, end: function(){}, send: function(){}});
    });

    describe('createUser', function (){

        beforeEach(function(){
            var self = this;
            self.User = { create: sinon.stub() };
            self.encrypt = { createSalt: sinon.spy(), hashPwd: sinon.spy() };

//            // Make sure the schema exists
//            mongoose.model('User', new mongoose.Schema());
//
//            // get the sandboxedModule to run our file in a VM with our mocks
//            return this.users = sandbox.require(serverPath + 'controllers/users', {
//                requires: {
//                    "User":self.User, // inject our fake User model
//                    "encrypt":self.encrypt
//                }
//            });

        });

        it('should create a new user with the data from the request', function(done){
            var nextSpy = sinon.spy();
            done();
            //this.users.createUser(reqStub, resStub, nextSpy);
            //expect(self.User.create.args[0][0].value).to.deep.equal(reqStub.user);
        });

    });

    describe('updateUser', function (){

        it('should save the displayName', function(done){
            reqStub.user.save = function(cb){ cb(); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0].displayName).to.equal(reqStub.body.displayName);
        });

        it('should save the username', function(done){
            reqStub.user.save = function(cb){ cb(); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0].username).to.equal(reqStub.body.username);
        });

        it('should save the skills', function(done){
            reqStub.user.save = function(cb){ cb(); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0].skills).to.equal(reqStub.body.skills);
        });

        it('should save a hash of the password if the password is provided', function(done){
            reqStub.user.save = function(cb){ cb(); done(); };
            reqStub.user.password = 'newpass';
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0].hashed_pwd).not.to.be.empty;
        });

        it('should save a password salt if the password is provided', function(done){
            reqStub.user.save = function(cb){ cb(); done(); };
            reqStub.user.password = 'newpass';
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0].salt).not.to.be.empty;
        });

        it('should set status of 403 and end the response if the user is not the user being saved and not an admin', function(){
            reqStub.user.id = "not 123";
            users.updateUser(reqStub, resStub);
            expect(resStub.status.args[0][0]).to.equal(403);
            expect(resStub.end.called).to.be.true;
        });

        it('should not set status of 403 if the user is an admin', function(done){
            reqStub.user.id = "not 123";
            reqStub.user.hasRole = function(){return true;};
            reqStub.user.save = function(cb){ cb(); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.status.notCalled).to.be.true;
            expect(resStub.end.notCalled).to.be.true;
        });

        it('should set status of 400 if there is an error saving', function(done){
            reqStub.user.save = function(cb){ cb("error"); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.status.args[0][0]).to.equal(400);
        });

        it('should send a reason to the response if there is an error saving', function(done){
            reqStub.user.save = function(cb){ cb("error"); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0]).to.deep.equal({reason:"error"});
        });

    });

});