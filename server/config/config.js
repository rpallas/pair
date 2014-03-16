'use strict';

var path = require('path'),
    packageJson = require('./package.json'),
    rootPath = path.normalize(__dirname + "/../../"),
    version = packageJson.version;

module.exports = {
    production: {
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@troup.mongohq.com:10094/app22501107',
        port: process.env.PORT || 80,
        version: version
    },
    development: {
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@troup.mongohq.com:10094/app22501107',
        port: process.env.PORT || 80,
        version: version
    },
    staging: {
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@troup.mongohq.com:10094/app22501107',
        port: process.env.PORT || 80,
        version: version
    },
    local: {
        rootPath: rootPath,
        db: 'mongodb://localhost/pair',
        port: process.env.PORT || 3030,
        version: version
    }
};