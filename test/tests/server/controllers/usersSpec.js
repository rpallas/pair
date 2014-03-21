/*jshint expr:true, -W079*/
"use strict";

var serverPath = '../../../../server/',
    userModel = require(serverPath + 'models/User'),
    users = require(serverPath + 'controllers/users'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    User = require('mongoose').model('User'),
    encrypt = require(serverPath + 'utilities/encryption');

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
                username: 'rob@test.com',
                firstName: 'Robbie',
                lastName: 'Pallas',
                password: 'password',
                skills: ['skill1', 'skill2', 'skill3']
            }
        });
        resStub = sinon.stub({ status: function(){}, end: function(){}, send: function(){}});
    });

    describe('updateUser', function (){

        it('should save the skills', function(done){
            reqStub.user.save = function(cb){ cb(); done(); };
            users.updateUser(reqStub, resStub);
            expect(resStub.send.args[0][0].skills).to.equal(reqStub.body.skills);
        });

    });

});