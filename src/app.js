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
	app.set("iconFolderURL", "/iconStorage");
	app.set("appFolderURL", "/appStorage");

	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({secret: 'turner', cookie: { httpOnly: false }}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
});

app.get('/', routes.home);
app.get('/admin', routes.home.admin );
app.get('/authenticate', passport.authenticate('local', {session:true, successRedirect: '/', failureRedirect: '/admin' }));
app.get('/logout', routes.home.logout );

//change the app.get to upload to SC3
app.post('/release', ensureAuthenticated, routes.newRelease.submit(app.get('localAppFolder'), app.get('appFolderURL')));
app.post('/setup', ensureAuthenticated, routes.setup.submit( app.get('localIconFolder'), app.get('iconFolderURL') ) );

app.get('/api/seed', routes.api.seed);
app.get('/api/apps', routes.api.apps);
app.get('/api/apps/:id', routes.api.appById);

app.get('/app/new', ensureAuthenticated, routes.partials.new);
app.get('/app/:id/details', routes.partials.appDetail);
app.get('/app/:id/newRelease', ensureAuthenticated, routes.partials.newRelease);
app.get('/app/:id/edit', ensureAuthenticated, routes.partials.edit);
app.get('/app/:id/delete', ensureAuthenticated, routes.home.delete );
app.get('/app/:id/authenticate', routes.partials.authenticate);

app.get('/apps/:name', routes.home.named);
app.get("/apps/:name/platform/:platform", routes.home.namedByPlatform);

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

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/admin');
}
