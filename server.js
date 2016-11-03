var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Database connection
//--------------------------------
require('./models/model'); 
var MONGODB_URI = 'mongodb://demouser:demopassword@ds161295.mlab.com:61295/mydemodb';
//var uristring = process.env.MONGODB_URI || 'mongodb://localhost/mydemodb';
var uristring = MONGODB_URI;
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});
//mongoose.connect('mongodb://localhost/mydemodb');
//mongoose.connect(MONGODB_URI);
///var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error'));
//------------------------------

var routes = require('./routes/routes');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/islands', routes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server running on port " + port + "...");
});


