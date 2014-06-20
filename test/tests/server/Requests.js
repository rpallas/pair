"use strict";

var expect = require('chai').expect,
    request = require('supertest'),
    sinon = require('sinon'),
    mongoose = require('mongoose');

var app, server;

var mockgoose = require('mockgoose');
mockgoose(mongoose);


describe('request', function () {

    beforeEach(function (done) {
        app = express();
        server = app.listen(255255);
    });

    afterEach(function () {
        server.close();
        mockgoose.reset();
    });

    describe('POST /api/requests', function () {

        var sampleRequest = {

        };

//        it('can store up to 5 suggested pair dates', function(done){
//
//            
//
//        });

    });

});
