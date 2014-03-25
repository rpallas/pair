'use strict';

var path = require('path'),
    packageJson = require('../../package.json'),
    rootPath = path.normalize(__dirname + "/../../"),
    version = packageJson.version;

module.exports = {
    production: {
        host: 'http://paired.herokuapp.com',
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@troup.mongohq.com:10094/app22501107',
        port: process.env.PORT || 80,
        version: version
    },
    development: {
        host: 'http://paired-dev.herokuapp.com',
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@lennon.mongohq.com:10011/app22993075',
        port: process.env.PORT || 80,
        version: version
    },
    staging: {
        host: 'http://paired-stage.herokuapp.com',
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@lennon.mongohq.com:10089/app23065150',
        port: process.env.PORT || 80,
        version: version
    },
    local: {
        host: 'http://127.0.0.1:3030',
        rootPath: rootPath,
        db: 'mongodb://localhost/pair',
        port: process.env.PORT || 3030,
        version: version
    }
};