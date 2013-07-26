var database = require('../lib').database;
var ObjectID = require('mongodb').ObjectID;

module.exports.appDetail = function(req,res,next) {

	searchAndRender(req, res, 'appDetail');

};

module.exports.newRelease = function(req,res,next) {

	searchAndRender(req, res, 'newRelease');

};

module.exports.edit = function(req,res,next) {

	searchAndRender(req, res, 'edit');

};

module.exports.new = function(req, res, next) {

	var app = {
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

var searchAndRender = function(req, res, pageName) {

	var user = req.user || { username : 'default', isAdmin : false };

	var id = new ObjectID(req.params.id);

	database.find( 'apps', {_id : id}, {}, function(err, apps) {
		res.render(pageName, {app:apps[0], user:user});
	});

};