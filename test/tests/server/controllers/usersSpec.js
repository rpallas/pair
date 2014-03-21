/*jshint expr:true, -W079*/
"use strict";

var serverPath = '../../../../server/',
    userModel = require(serverPath + 'models/User'),
    users = require(serverPath + 'controllers/users'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    User = require('mongoose').model('User');

describe('users controller', function (){
    var reqStub, resStub;

    beforeEach(function(){
        reqStub = sinon.stub({
            isAuthenticated: function(){},
            user: {
                hasRole: function(role){},
                id: '123',
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                skills: [],
                roles: ["guest"]
            },
            body: {
                _id: '123',
                username: 'jb@test.com',
                firstName: 'Joe',
                lastName: 'Blogs',
                password: 'password',
                skills: ['skill1', 'skill2', 'skill3']
            }
        });
        resStub = sinon.stub({ status: function(){}, end: function(){}, send: function(){}});
    });

    describe('updateUser', function (){

        it('should save the firstName', function(done){
            reqStub.user.save = function(cb){ cb(); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0].firstName).to.equal(reqStub.body.firstName);
        });

        it('should save the lastName', function(done){
            reqStub.user.save = function(cb){ cb(); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0].lastName).to.equal(reqStub.body.lastName);
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

    });

});