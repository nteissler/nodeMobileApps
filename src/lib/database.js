var MongoClient = require('mongodb').MongoClient

var connectionString = 'mongodb://mobile:m0b1l3@ds035498.mongolab.com:35498/mobile-apps';

var getConnection = function(func) {
	MongoClient.connect(connectionString, function(err, db) {
		if( err ) { 
			func( err, null ); 
		} else {
			func( null, db );
		}
	});
};

var database = {

	find : function( collectionName, query, func ) {

		getConnection( function(err, db) {
			if( err ) {
				return func( err, null );
			}

			var collection = db.collection(collectionName);

			collection.find(query).toArray(func);
		});
	},
}

module.exports = database