'use strict';

var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    displayName: {type: String, required:'{PATH} is required!'},
    username: {
        type: String,
        required:'{PATH} is required!',
        unique: true
    },
    githubId: Number,
    salt: {type: String, select: false},        // salt and hashed_pwd are excluded for added security
    hashed_pwd: {type: String, select: false},
    roles: [String],
    status: String,
    points: Number,
    skills: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'rob');
            User.create({displayName: "Robbie Pallas", username:"robbie@test.com", salt: salt, hashed_pwd: hash, roles: ['admin'], status: "ready to pair", points: 50000, skills: ['javascript', 'node', 'angular', 'knockout.js', 'c#'] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'chris');
            User.create({displayName: "Chris Shepherd", username:"chris@test.com", salt: salt, hashed_pwd: hash, roles: [], status: "unavailable", points: 100, skills: ['javascript', 'node', 'silverlight', 'knockout.js', 'c#'] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'mark');
            User.create({displayName: "Mark Cormack", username:"mark@test.com", salt: salt, hashed_pwd: hash, status: "schedule", points: 100, skills: ['UX', 'html', 'css', 'design', 'raspberry pi']});
        }
    });
}
exports.createDefaultUsers = createDefaultUsers;