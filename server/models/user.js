var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: {type: String, select: false},        // salt and hashed_pwd are excluded for added security
    hashed_pwd: {type: String, select: false},
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
    User.find({}).exec(function(err,collection){
        if(collection.length === 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'rob');
            User.create({firstName: "Robbie", lastName: "Pallas", username:"rob", salt: salt, hashed_pwd: hash, roles: ['admin'] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'chris');
            User.create({firstName: "Chris", lastName: "Shepherd", username:"chris", salt: salt, hashed_pwd: hash, roles: [] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'mark');
            User.create({firstName: "Mark", lastName: "Cormack", username:"mark", salt: salt, hashed_pwd: hash});
        }
    });
}
exports.createDefaultUsers = createDefaultUsers;