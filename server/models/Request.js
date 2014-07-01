"use strict";

var mongoose = require('mongoose');

var TimeItemSchema = {
    text: { type: String, trim: true },
    accepted: Boolean
};

var requestSchema = mongoose.Schema({
    fromUser: {
        type: {
            id: mongoose.Schema.ObjectId,
            displayName: String,
            avatarUrl: String
        },
        required:'{PATH} is required!'
    },
    toUser: {
        type: {
            id: mongoose.Schema.ObjectId,
            displayName: String,
            avatarUrl: String
        },
        required:'{PATH} is required!'
    },
    state: {type: String, enum: ['Waiting', 'Accepted', 'Rejected', 'Reschedule']},
    sentDateTime: Date,
    responseDateTime: Date,
    message: String,
    timeList: [TimeItemSchema]
});


requestSchema.methods = {

};

var Request = mongoose.model('Request', requestSchema);
