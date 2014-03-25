'use strict';

var path = require('path'),
    packageJson = require('../../package.json'),
    rootPath = path.normalize(__dirname + "/../../"),
    version = packageJson.version;

module.exports = {
    production: {
        host: 'http://paired.herokuapp.com',
        githubClientId: '',
        githubClientSecret: '',
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@troup.mongohq.com:10094/app22501107',
        port: process.env.PORT || 80,
        version: version
    },
    development: {
        host: 'http://paired-dev.herokuapp.com',
        githubClientId: '54b8e32c426cf0dcbd98',
        githubClientSecret: '462937b00735f495950104a4e4eecc5d7a498713',
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@lennon.mongohq.com:10011/app22993075',
        port: process.env.PORT || 80,
        version: version
    },
    staging: {
        host: 'http://paired-stage.herokuapp.com',
        githubClientId: '',
        githubClientSecret: '',
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@lennon.mongohq.com:10089/app23065150',
        port: process.env.PORT || 80,
        version: version
    },
    local: {
        host: 'http://127.0.0.1:3030',
        githubClientId: '0d983fa0cfb7140a02f9',
        githubClientSecret: '813514f122d7a4cbf2453676cf6495fb9f238501',
        rootPath: rootPath,
        db: 'mongodb://localhost/pair',
        port: process.env.PORT || 3030,
        version: version
    }
};