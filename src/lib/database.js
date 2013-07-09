var MongoClient = require('mongodb').MongoClient

var database = {
	
	getConnection : function(func) {
		MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
			if( err ) { 
				func( err, null ); 
			} else {
				func( null, db );
			}
		});
	},

	getCollection : function( collectionName, func ) {

		getConnection( function(err, db) {
			if( err ) {
				return func( err, null );
			}

			var collection = db.collection(collectionName);

			func( err, collection );
		})
	}
}

module.exports = database