var database = require('../lib').database;
var _ = require('underscore');
var ObjectID = require('mongodb').ObjectID;

module.exports.apps = function(req,res,next) {

	database.find( 'apps', {}, function(err, apps){
		res.json( 200, apps );
	});
}

module.exports.appById = function(req,res,next) {

	var id = new ObjectID(req.params.id);

	database.find( 'apps', {_id : id }, function(err, apps) {

		if(err) {
			return next(err);
		}

		if((apps) && (_.isArray(apps))) {
			res.json(200, apps[0]);
		}
	});
}

module.exports.seed = function(req,res,next) {

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
		current : {
			version : '0.2.1',
			notes : 'Minor bugfix',
			file : '/files/appid/0.2.1'
		},
		releases : [{
			version : '0.2.0',
			notes : 'v2',
			file : '/files/appid/0.2.0'
		},
		{
			version : '0.1.7',
			notes : 'Testing',
			file : '/files/appid/0.1.7'
		}]
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
		current : null,
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
		current : null,
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
		current : null,
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
}