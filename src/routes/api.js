var database = require('../lib').database;

module.exports.apps = function(req,res,next) {

	database.find( 'apps', {}, function(err, apps){
		res.json( 200, apps );
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
}