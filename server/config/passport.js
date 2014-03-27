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
            clientID: config.githubClientId,
            clientSecret: config.githubClientSecret,
            callbackURL: config.host + "/auth/github/callback",
            scope: ['user:email']
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({githubId: profile.id}).exec(function(err, doc){
                if(!doc){
                    var newUser = {
                        githubId: profile.id,
                        // username is unique, so if not known, create a unique placeholder starting with @ (so its invalid)
                        username: profile.emails.length > 0 && profile.emails[0].value !== "" ? profile.emails[0].value : "@" + profile.id,
                        displayName: profile.displayName,
                        avatarUrl: profile._json.avatar_url,
                        token: accessToken
                    };
                    User.create(newUser).then(function(user){
                        if (profile.emails.length < 1 || profile.emails[0].value === ""){
                            // Return an error - the email is not present. This can happen if
                            // the Github user doesn't have a public email address.
                            return done(null, user);
                        }
                        return done(null, user);
                    });
                } else {
                    doc.token = accessToken;
                    doc.save(function(err, user, num){
                        if (err){ console.log('error saving access token'); }
                    });
                    // Ensure token is stored in the db before it gets requested
                    process.nextTick(function() {
                        return done(err,doc);
                    });
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