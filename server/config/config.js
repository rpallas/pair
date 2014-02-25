var path = require('path');
var rootPath = path.normalize(__dirname + "/../../");

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/pair',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://app_usr:pair2pair@troup.mongohq.com:10094/app22501107',
        port: process.env.PORT || 80
    }
}