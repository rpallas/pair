'use strict';

var Request = require('mongoose').model('Request');

exports.getRequests = function(req, res){
    Request.find({}).exec(function(err, collection){
        res.send(collection);
    });
};

exports.getAllRequestsByUserId = function(req, res){
//    Request.find({
//        $or: [
//            {"toUser.id": req.params.userId},
//            {"fromUser.id": req.params.userId}
//        ]
//    }).exec(function(err, requests){
//        res.send(requests);
//    });
    Request.find().or([
        {"toUser.id": req.params.userId},
        {"fromUser.id": req.params.userId}
    ]).exec(function(err, requests){
        res.send(requests);
    });
};

exports.createRequest = function(req, res, next){
    var requestData = req.body;
    requestData.sentDateTime = new Date();
    requestData.state = 'Waiting';
    Request.create(requestData, function(err, request){
        if(err){
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(request);
    });
};

exports.updateRequest = function(req, res){
    Request.findOne({_id: req.body._id}).exec(function(err, request){
        request.state = req.query.state;
        request.save(function(err){
            if(err) {
                res.status(400);
                return res.send({reason: err.toString()});
            }
            res.send(request);
        });
    });
};