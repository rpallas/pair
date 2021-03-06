'use strict';

var Request = require('mongoose').model('Request');

exports.getRequest = function(req, res){
    Request.findOne({_id: req.params.id}).exec(function(err, doc){
        res.send(doc);
    });
};

exports.getRequests = function(req, res){
    Request.find().exec(function(err, collection){
        res.send(collection);
    });
};

exports.getReceivedRequests = function(req, res){
    var query = Request.find({"toUser.id": req.params.userId});
    if(req.query.limit){ query.limit(req.query.limit); }
    query.exec(function(err, requests){
        res.send(requests);
    });
};

exports.getSentRequests = function(req, res){
    var query = Request.find({"fromUser.id": req.params.userId});
    if(req.query.limit){ query.limit(req.query.limit); }
    query.exec(function(err, requests){
        res.send(requests);
    });
};

exports.getAllRequestsByUserId = function(req, res){
    var query = Request.find().or([
        {"toUser.id": req.params.userId},
        {"fromUser.id": req.params.userId}
    ]);
    if(req.query.limit){ query.limit(req.query.limit); }
    if(req.query.sort){ query.sort([['sentDateTime', req.query.sort]]); }
    query.exec(function(err, requests){
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