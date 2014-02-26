var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log('pair db opened');
    });

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
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };
    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function(err,collection){
        if(collection.length === 0){
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'rob');
            User.create({firstName: "Robbie", lastName: "Pallas", username:"rob", salt: salt, hashed_pwd: hash, roles: ['admin'] });
            salt = createSalt();
            hash = hashPwd(salt, 'chris');
            User.create({firstName: "Chris", lastName: "Shepherd", username:"chris", salt: salt, hashed_pwd: hash, roles: [] });
            salt = createSalt();
            hash = hashPwd(salt, 'mark');
            User.create({firstName: "Mark", lastName: "Cormack", username:"mark", salt: salt, hashed_pwd: hash});
        }
    });

};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}