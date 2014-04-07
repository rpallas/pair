"use strict";

var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
    fromUser: {
        type: {
            id: mongoose.Schema.ObjectId,
            displayName: 'string',
            avatarUrl: 'string'
        },
        required:'{PATH} is required!'
    },
    toUser: {
        type: {
            id: mongoose.Schema.ObjectId,
            displayName: 'string',
            avatarUrl: 'string'
        },
        required:'{PATH} is required!'
    },
    state: {type: String, enum: ['Waiting', 'Accepted', 'Rejected', 'Rescheduled']},
    sentDateTime: Date,
    responseDateTime: Date
});

requestSchema.methods = {

};

var Request = mongoose.model('Request', requestSchema);
