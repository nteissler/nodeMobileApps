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
app.use("/design", express.static(__dirname + '/design'));

app.get('/', routes.home);
app.get('/log', lib.logger.view);
app.get('/log/add', lib.logger.add);
app.get('/log/clear', lib.logger.clear);
app.get('/log/test', lib.logger.test);

app.get('/api/seed', function(req,res,next){

	var apps = [
	{
		name : 'App 1',
		description : 'foo',
		icon : '',
		platform : 'iPhone',
		clientWorkingGroup : 'TEN',
		isDevelopment : true,
		releases : []
	},
	{
		name : 'App 2',
		description : 'bar',
		icon : '',
		platform : 'iPad',
		clientWorkingGroup : 'TEN',
		isDevelopment : false,
		releases : []
	},
	{
		name : 'App 3',
		description : 'foz',
		icon : '',
		platform : 'android',
		clientWorkingGroup : 'TEN',
		isDevelopment : true,		
		releases : [],
	},
	];

	database.collection( 'apps', function( err, collection ) {
		collection.drop();

		database.insert( 'apps', apps, function(err, results){
			database.find( 'apps', {}, function( err, results ) {
				res.json( 200, results );
			});
		});
	});
});