var express         = require('express');
var bodyParser      = require('body-parser');
var routes_sensor   = require('./routes_sensor');
var settings        = require('./config.json');
const _             = require('./database/db-connector');
const broker        = require('./database/broker');
var cors            = require('cors');

var app             = express();

app.set('secretkey', settings.secretkey);
app.set('username', settings.username);
app.set('password', settings.password);
app.set('webPort', settings.webPort);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Middelware, logging voor alle request
app.all('*', function (req, res, next) {
    console.log(req.method + " " + req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Routing with versions
app.use(function(req, res, next) {
    next();
});

// Middleware statische bestanden (HTML, CSS, images)
app.use('/static', express.static(__dirname + '/public'));

// Routing with versions
app.use('/sensor', routes_sensor);


// Start server
var port = process.env.PORT || app.get('webPort');
var server = app.listen(port, function () {
    console.log('Listening server on port ' + server.address().port);
});

module.exports = app;