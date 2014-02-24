var express = require('express'),
    stylus = require('stylus'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

app.configure(function(){
    app.set('views', __dirname + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(stylus.middleware({
        src: __dirname + '/public',
        compile: compile
    }));
    app.use(express.static(__dirname + '/public'));
});

// Connection string
if(env === "development"){
    mongoose.connect('mongodb://localhost/pair');
} else {
    mongoose.connect('mongodb://app_usr:pair2pair@troup.mongohq.com:10094/app22501107');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('pair db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');