var express = require('express');
var routes = require('./routes');
var lib = require('./lib');

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

app.set("localAppFolder",__dirname+'/public/appStorage');
app.set("localIconFolder",__dirname+'/public/iconStorage');

app.use(express.bodyParser());

app.get('/', routes.home);
//change the app.get to upload to SC3
app.post('/release',routes.newRelease.submit(app.get('localAppFolder')));
app.post('/setup',routes.setup.submit(app.get('localIconFolder')));


app.get('/api/seed', routes.api.seed);
app.get('/api/apps', routes.api.apps);
app.get('/api/apps/:id', routes.api.appById);

app.get('/apps/:name', routes.home.named);
app.get("/apps/:name/:platform", routes.home.namedByPlatform);

// Generic catch all route
app.get(/^(.+)$/, function(req, res,next) {
	res.sendfile('public/' + req.params[0], function( err ) {
		res.status(404);
		res.sendfile('404.html');
	});
});
