'use strict';

var Request = require('mongoose').model('Request');

exports.getRequests = function(req, res){
    Request.find({}).exec(function(err, collection){
        res.send(collection);
    });
};

exports.getRequestsByUserId = function(req, res){
    Request.find({_id: req.params.id}).exec(function(err, requests){
        res.send(requests);
    });
};

exports.createRequest = function(req, res, next){
    var requestData = req.body;
    requestData.sentDateTime = new Date();
    requestData.state = 'Sent';
    Request.create(requestData, function(err, request){
        if(err){
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(request);
    });
};

// TODO
//exports.updateRequest = function(req, res){
//    var userUpdates = req.body;
//    req.user.displayName = userUpdates.displayName;
//    req.user.username = userUpdates.username;
//    req.user.skills = userUpdates.skills;
//    if(userUpdates.password && userUpdates.password.length > 0){
//        req.user.salt = encrypt.createSalt();
//        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
//    }
//    req.user.save(function(err){
//        if(err) {
//            res.status(400);
//            return res.send({reason: err.toString()});
//        }
//        res.send(req.user);
//    });
//};