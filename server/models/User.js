var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required:'{PATH} is required!'},
    lastName: {type: String, required:'{PATH} is required!'},
    username: {
        type: String,
        required:'{PATH} is required!',
        unique: true
    },
    salt: {type: String, required:'{PATH} is required!', select: false},        // salt and hashed_pwd are excluded for added security
    hashed_pwd: {type: String, required:'{PATH} is required!', select: false},
    roles: [String]
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
    User.find({}).exec(function(err,collection){
        if(collection.length === 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'rob');
            User.create({firstName: "Robbie", lastName: "Pallas", username:"robbie@test.com", salt: salt, hashed_pwd: hash, roles: ['admin'] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'chris');
            User.create({firstName: "Chris", lastName: "Shepherd", username:"chris@test.com", salt: salt, hashed_pwd: hash, roles: [] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'mark');
            User.create({firstName: "Mark", lastName: "Cormack", username:"mark@test.com", salt: salt, hashed_pwd: hash});
        }
    });
}
exports.createDefaultUsers = createDefaultUsers;