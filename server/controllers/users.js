'use strict';

var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res){
    User.find({}).exec(function(err, collection){
        res.send(collection);
    });
};

exports.getUserById = function(req, res){
    User.findOne({_id: req.params.id}).exec(function(err, user){
        res.send(user);
    });
};

exports.createUser = function(req, res, next){
    var userData = req.body;
    userData.username = userData.username.toLowerCase(); // Prevents duplicate users with different casing in email address
    userData.points = 0; // initialise the points to zero
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    User.create(userData, function(err, user){
        if(err){
            // E11000 is the mongo error code meaning the record already exists
            if(err.toString().indexOf('E11000') > -1){
                err = new Error('A user with that email address already exists');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        // Log the user in
        req.logIn(user, function(err){
            if(err){ return next(err); }
            res.send(user);
        });
    });
};

exports.updateUser = function(req, res){
    var userUpdates = req.body;

    if(req.user.id !== userUpdates._id && !req.user.hasRole('admin')){
        res.status(403);
        return res.end();
    }

    req.user.displayName = userUpdates.displayName;
    req.user.username = userUpdates.username;
    req.user.skills = userUpdates.skills;
    if(userUpdates.password && userUpdates.password.length > 0){
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
    }
    req.user.save(function(err){
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(req.user);
    });
};