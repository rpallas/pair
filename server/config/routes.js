'use strict';

var auth = require('./auth'),
    users = require('../controllers/users'),
    requests = require('../controllers/requests'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Request = mongoose.model('Request');

module.exports = function(app, config){

    app.get('/api/users', auth.requiresApiLogin, users.getUsers);
    app.get('/api/users/:id', auth.requiresApiLogin, users.getUserById);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/requests', auth.requiresApiLogin, requests.getRequests);
    app.get('/api/requests/:toUser', auth.requiresApiLogin, requests.getRequestsByUserId);
    app.post('/api/requests', requests.createRequest);
//    app.put('/api/requests', requests.updateRequest);

    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params);
    });

    app.get('/auth/github', auth.authenticateGithub);
    app.get('/auth/github/callback', auth.authenticateGithubCallback);

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    app.all('/api/*', function(req, res){
        res.send(404);
    });

    app.get('*', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user,
            version: config.version
        });
    });

};
