var database = require('../lib').database;
var _ = require('underscore');

module.exports = function (request, response, next)
{
	searchAndRender( {}, response );
}

module.exports.named = function(request,response,next) {

	var query = { name: new RegExp(request.params.name, 'i') };

	searchAndRender(query, response);
}

module.exports.namedByPlatform = function(request, response, next) {

	var query = {
		name: new RegExp(request.params.name, 'i'),
		platform: request.params.platform
	};

	searchAndRender(query, response);
}

var searchAndRender = function(query, response) {
	database.find( 'apps', query, { name : 1 }, function(err, apps){

		if( (apps) && (_.isArray(apps)) && (apps.length > 1)) {
			response.render('home', {apps: apps});
		} else {
			response.render('app', {app:apps[0]});
		}
	});
}

module.exports.admin = function(request, response, next) {
	response.render('login');
};