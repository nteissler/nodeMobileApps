var database = require('../lib').database;

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
	database.find( 'apps', query, function(err, apps){
		response.render('home', {apps: apps});
	});
}