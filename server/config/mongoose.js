'use strict';

var mongoose = require('mongoose'),
    userRequestModel = require('../models/Request'),
    userModel = require('../models/User');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log('pair db opened');
    });

    userModel.createDefaultUsers();
};