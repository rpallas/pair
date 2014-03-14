var auth = require('./auth'),
    users = require('../controllers/users'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app, config){

    app.get('/api/users', auth.requiresApiLogin, users.getUsers);
    app.get('/api/users/:id', auth.requiresApiLogin, users.getUserById);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params);
    });

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
