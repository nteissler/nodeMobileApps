var express = require('express');
var routes = require('./routes');
var lib = require('./lib');

var database = lib.database; 
var app = express();
var http = require('http');
var server = http.createServer(app);

//setup to run on cloud9 or AWS/nginx setup
var port = process.argv[2] || process.env.PORT;

lib.logger.init(server, true, 100);

server.listen(port);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.use(express.static("/design", __dirname + '/public'));

app.get('/', routes.home);
app.get('/log', lib.logger.view);
app.get('/log/add', lib.logger.add);
app.get('/log/clear', lib.logger.clear);
app.get('/log/test', lib.logger.test);

database.find('users', { 'username': 'kevin' }, function( err, users ) {

console.log( users );

});