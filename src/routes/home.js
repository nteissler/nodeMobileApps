var database = require('../lib').database;

module.exports = function (request, response)
{
	database.find('users', {}, function(err,results){
		response.json(200, results);
	});
}