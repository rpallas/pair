'use strict';

var passport = require('passport');

exports.authenticate = function(req, res, next){
    if(!req.body.username){
        res.send({ success:false });
        return;
    }

    // All email addresses are stored in lowercase
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function(err, user){
        if(err) { return next(err); }
        if(!user){
            res.send({ success:false });
        } else {
            req.logIn(user, function(){
                if(err) { return next(err); }
                res.send({ success: true, user: user });
            });
        }
    });
    auth(req, res, next);
};

exports.authenticateGithub = function(req, res, next){
    var auth = passport.authenticate('github');
    auth(req, res, next);
};

exports.authenticateGithubCallback = function(req, res, next){
    var auth = passport.authenticate('github', function(err, user){

//        debugger;

        if(err) { return next(err); }
        if(!user){
            res.send({ success:false });
        } else {
            req.logIn(user, function(){
                if(err) { return next(err); }
                //res.send({ success: true, user: user });
                res.redirect('/dashboard');
            });
        }
    });
    auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next){
    if(!req.isAuthenticated()){
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.requiresRole = function(role){
    return function(req, res, next){
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
            res.status(403);
            res.end();
        } else {
            next();
        }
    };
};