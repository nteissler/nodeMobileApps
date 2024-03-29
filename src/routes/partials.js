 var database = require('../lib').database;
var ObjectID = require('mongodb').ObjectID;

module.exports.appDetail = function(req,res,next) {

	var user = getUser(req);

	getApp(req, function(err, app) {

		if(err) {
			return next(err);
		}

		if( ( app.security.secured === true ) && ( !req.isAuthenticated() ) ) {
			res.render('appAuthentication', {app:app});
		} else {
			res.render('appDetail', {app:app, user:user});	
		}
	});

};

module.exports.authenticate = function(req,res,next) {

	console.log("AUTHENTICATING")

	var password = req.body.password; 
	var user = getUser(req);
	
	getApp(req, function(err, app) {

		if(err) {
			return next(err);
		}

		if(password != app.security.passcode) {
			console.log("incorrect password!");
			res.render('appAuthentication', {app:app});
		} else {
			console.log("rendering app detail!");
			res.render('appDetail', {app:app, user:user});	
		}
	});

};

module.exports.newRelease = function(req,res,next) {

	searchAndRender(req, res, next, 'newRelease');

};

module.exports.edit = function(req,res,next) {

	searchAndRender(req, res, next, 'edit');

};

module.exports.new = function(req, res, next) {

	var app = {
		_id: '',
		name : '',
		description : '',
		icon : null,
		platform : '',
		clientWorkingGroup : '',
		security : {
			development : true,
			secured : false,
			passcode : '',
			hidden : false
		},
		current : null,
		releases : []
	};

	res.render('edit', {app:app});
};

var searchAndRender = function(req, res, next, pageName) {

	var user = getUser(req);

	getApp(req, function(err, app){
		if(err) {
			next(err);
		} else {
			res.render(pageName, {app:app, user:user});
		}
	});

};

var getUser = function(req) {

	return req.user || { username : 'default', isAdmin : false };

}

var getApp = function(req, func) {

	var id = new ObjectID(req.params.id);

	database.find( 'apps', {_id : id}, {}, function(err, apps) {

		if(err) {
			func(err, null);
		} else {
			func(null, apps[0]);
		}
	});
}