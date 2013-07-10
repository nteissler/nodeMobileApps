var express = require('express');
var routes = require('./routes');
var lib = require('./lib');

var database = lib.database; 
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

app.get('/', routes.home);
app.get('/upload',routes.upload.form);

app.get('/api/seed', function(req,res,next){

	var apps = [
	{
		name : 'App 1',
		description : 'foo',
		icon : '/images/app-icon.png',
		platform : 'iPhone',
		clientWorkingGroup : 'TEN',
		security : {
			development : true,
			secured : false,
			passcode : '',
			hidden : false
		},
		releases : []
	},
	{
		name : 'App 2',
		description : 'bar',
		icon : '/images/app-icon.png',
		platform : 'iPad',
		clientWorkingGroup : 'TEN',
		security : {
			development : true,
			secured : false,
			passcode : '',
			hidden : false
		},
		releases : []
	},
	{
		name : 'App 3',
		description : 'foz',
		icon : '/images/app-icon.png',
		platform : 'android',
		clientWorkingGroup : 'TEN',
		security : {
			development : true,
			secured : false,
			passcode : '',
			hidden : false
		},
		releases : [],
	},
	{
		name : 'App 4',
		description : 'foz',
		icon : '/images/app-icon.png',
		platform : 'android',
		clientWorkingGroup : 'TEN',
		security : {
			development : true,
			secured : false,
			passcode : '',
			hidden : false
		},
		releases : [],
	},
	];

	database.collection('apps', function( err, collection ) {
		collection.drop();

		database.insert('apps', apps, function(err, results) {
			database.find('apps', {}, function( err, results ) {
				res.json( 200, results );
			});
		});
	});
});