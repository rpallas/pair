/*jshint expr: true, -W079*/
'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    crypto = require('crypto'),
    serverPath = '../../../../server/',
    encryption = require(serverPath + 'utilities/encryption');

describe('encryption', function(){

    describe('createSalt', function(){

        it("should return a non empty string", function(){
            var result = encryption.createSalt();
            expect(result).to.be.a('string').with.length.above(0);
        });

        it('should call crypto.randomBytes with 128 as the argument', function(){
            var cryptoStub = sinon.stub(crypto, "randomBytes").returns("a string");
            encryption.createSalt();
            expect(cryptoStub.calledWith(128)).to.be.true;
        });

    });

    describe('hashPwd', function(){

        it('should return a 40 character string', function(){
            var result = encryption.hashPwd("salt", "pass");
            expect(result).to.be.a('string').with.length(40);
        });
    });

});