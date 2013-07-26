var database = require('../lib').database;
var ObjectID = require('mongodb').ObjectID;

module.exports.appDetail = function(req,res,next) {

	var user = req.user || { username : 'default', isAdmin : false };

	var id = new ObjectID(req.params.id);

	database.find( 'apps', {_id : id}, {}, function(err, apps) {
		res.render('appDetail', {app:apps[0], user:user});
	});

};

module.exports.newRelease = function(req,res,next) {

	var user = req.user || { username : 'default', isAdmin : false };

	var id = new ObjectID(req.params.id);

	database.find( 'apps', {_id : id}, {}, function(err, apps) {
		res.render('newRelease', {app:apps[0], user:user});
	});

};