'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    User = mongoose.model('User');

module.exports = function(config){

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

    passport.use(new GitHubStrategy({
            clientID: '0d983fa0cfb7140a02f9',
            clientSecret: '813514f122d7a4cbf2453676cf6495fb9f238501',
            callbackURL: config.host + "/auth/github/callback",
            scope: ['user:email']
        },
        function(accessToken, refreshToken, profile, done) {
            var email = profile.emails.length > 0 ? profile.emails[0].value : "",
                query = { githubId: profile.id },
                createData = {
                    githubId: profile.id,
                    username: email,
                    displayName: profile.displayName
                };
            User.findOne({query: query}).exec(function(err, doc){
//                debugger;
                if(!doc){
                    User.create(createData).then(function(user){
                        return done(null, user);
                    });
                } else {
                    return done(err, doc);
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