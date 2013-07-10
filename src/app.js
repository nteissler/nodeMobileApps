var express = require('express');
var routes = require('./routes');
var lib = require('./lib');

var api = require('./routes').api;

var app = express();
var http = require('http');
var server = http.createServer(app);

//setup to run on cloud9 or AWS/nginx setup
var port = process.argv[2] || process.env.PORT;

server.listen(port);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.use("/design", express.static(__dirname + '/design'));
app.use("localAppFolder",__dirname+'/public/appStorage');

app.get('/', routes.home);
app.get('/upload',routes.upload.form);
//change the app.get to upload to SC3
app.post('/upload/new',
	routes.upload.submit(app.get('localAppFolder')));
app.post('/upload/update',
	routes.upload.update(app.get('localAppFolder')));

app.get('/api/seed', api.seed);
app.get('/api/apps', api.apps);
