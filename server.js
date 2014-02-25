var express = require('express'),
    stylus = require('stylus'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    env = process.env.NODE_ENV = process.env.NODE_ENV || "development",
    app = express(),
    config = require('./server/config/config')[env];

// Configure express
require('./server/config/express')(app, config);

// Connect to DB
require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}).exec(function(err, user){
            if(user){
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

// Setup the routes
require('./server/config/routes')(app);

// Start the server
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');