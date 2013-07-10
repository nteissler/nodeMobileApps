var database = require('../lib').database;

module.exports = function (request, response)
{
	database.find('apps', {}, function(err,results){
		response.json(200, results);
	});
}