var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes');
var lib = require('./lib');

var app = express();
var http = require('http');
var server = http.createServer(app);

//setup to run on cloud9 or AWS/nginx setup
var port = process.argv[2] || process.env.PORT;

server.listen(port);

// Configuration
app.configure(function(){
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	app.engine('html', require('ejs').__express);
	app.use(express.static(__dirname + '/public'));
	app.use("/design", express.static(__dirname + '/design'));

	app.set("localAppFolder",__dirname+'/public/appStorage');
	app.set("localIconFolder",__dirname+'/public/iconStorage');

	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({secret: 'turner', cookie: { httpOnly: false }}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(setUserCookies);
	app.use(app.router);
});

app.get('/', routes.home);
app.get('/admin', routes.home.admin );
app.get('/authenticate', passport.authenticate('local', {session:true, successRedirect: '/', failureRedirect: '/admin' }));
app.get('/logout', routes.home.logout );

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
		res.render('404');
	});
});

passport.use('local', new LocalStrategy( function(username, password, done) {

	if( ( username != 'admin') || ( password != '@dm1n' ) ) {
		return done(null, false);
	} else {
		return done( null, { username : 'Admin', isAdmin: true } );
	}
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

function setUserCookies(req,res,next) {

	var user = req.user || { username: 'default', isAdmin: false};

	console.log(user);

	res.cookie('user', JSON.stringify(user));

	next();
}