var database = require('../lib').database;
var _ = require('underscore');
var ObjectID = require('mongodb').ObjectID;

module.exports = function (request, response, next)
{
	searchAndRender( {}, request.user, response );
}

module.exports.named = function(request,response,next) {

	var query = { name: new RegExp(request.params.name, 'i') };

	searchAndRender(query, request.user, response, request);
}

module.exports.namedByPlatform = function(request, response, next) {

	var query = {
		name: new RegExp(request.params.name, 'i'),
		platform: request.params.platform
	};

	searchAndRender(query, request.user, response, request);
}

var searchAndRender = function(query, user, response, request) {

	user = _.isUndefined(user) ? {isAdmin:false} : user;

	database.find( 'apps', query, { name : 1 }, function(err, apps){

		if( (apps) && (_.isArray(apps)) && (apps.length > 1)) {
			response.render('home', {apps:apps, user:user});
		} else if(apps.length == 1){
			if( ( apps[0].security.secured === true ) && ( !request.isAuthenticated() ) ) {
				response.render('appAuthentication', {app:apps[0]});
			} else {
				response.render('app', {app:apps[0], user:user});	
			}
		} else {
			response.status(404);
			response.render('404');	
		}
	});
}

module.exports.admin = function(request, response, next) {
	response.render('login');
};

module.exports.logout = function(req,res,next) {
	req.logout();
	res.redirect(req.headers.referer);
}

module.exports.delete = function(req,res,next) {

	var id = new ObjectID( req.params.id );

	database.delete( 'apps', id, function(err, documentsRemove) {

		if(err) {
			next(err);
		} else {
			res.redirect(req.headers.referer);
		}
	});

}