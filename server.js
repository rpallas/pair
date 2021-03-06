var express = require('express'),
    stylus = require('stylus'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || "local",
    app = express(),
    config = require('./server/config/config')[env];

// Configure express
require('./server/config/express')(app, config);

// Connect to DB
require('./server/config/mongoose')(config);

// Configure passport
require('./server/config/passport')(config);

// Setup the routes
require('./server/config/routes')(app, config);

// Start the server
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
