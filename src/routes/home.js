var database = require('../lib').database;
var _ = require('underscore');

module.exports = function (request, response, next)
{
	searchAndRender( {}, request.user, response );
}

module.exports.named = function(request,response,next) {

	var query = { name: new RegExp(request.params.name, 'i') };

	searchAndRender(query, request.user, response);
}

module.exports.namedByPlatform = function(request, response, next) {

	var query = {
		name: new RegExp(request.params.name, 'i'),
		platform: request.params.platform
	};

	searchAndRender(query, request.user, response);
}

var searchAndRender = function(query, user, response) {

	user = _.isUndefined(user) ? {isAdmin:false} : user;

	database.find( 'apps', query, { name : 1 }, function(err, apps){

		if( (apps) && (_.isArray(apps)) && (apps.length > 1)) {
			response.render('home', {apps:apps, user:user});
		} else {
			response.render('app', {app:apps[0], user:user});
		}
	});
}

module.exports.admin = function(request, response, next) {
	response.render('login');
};

module.exports.logout = function(req,res,next) {
	req.logout();
	res.redirect('/');
}