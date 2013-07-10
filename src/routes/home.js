var database = require('../lib').database;

module.exports = function (request, response, next)
{
	database.find( 'apps', {}, function(err, apps){
		console.log( 'Rendering apps');
		response.render('index', {apps: apps});
	});
}