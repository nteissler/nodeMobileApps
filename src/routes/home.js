var database = require('../lib').database;

module.exports = function (request, response, next)
{
	database.find( 'apps', {}, function(err, apps){
		response.render('home', {apps: apps});
	});
}