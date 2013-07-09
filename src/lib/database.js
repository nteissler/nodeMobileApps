var MongoClient = require('mongodb').MongoClient

var getConnection = function(func) {
	MongoClient.connect('mongodb://appKhronos:khronos@localhost:27017/kronus', function(err, db) {
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