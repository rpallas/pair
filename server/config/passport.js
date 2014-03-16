'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function(){

    passport.use(new LocalStrategy(
        function(username, password, done){
            // We have to force the inclusion of hashed_pwd and salt as they are excluded at the schema level
            User.findOne({username: username}, '+hashed_pwd +salt').exec(function(err, user){
                if(user && user.authenticate(password)){
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    passport.serializeUser(function(user, done){
        if(user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done){
        User.findOne({_id: id}).exec(function(err, user){
            if(user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });

};