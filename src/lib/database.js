var MongoClient = require('mongodb').MongoClient
var _ = require('underscore');

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

var getCollection = function(collectionName, func) {
	getConnection(function(err,db){
		if(err) {
			func(err,null);
		} else {
			db.collection(collectionName, func);
		}
	})
};

var database = {

	collection : function( name, func ) {
		getCollection(name, func);
	},

	find : function( collectionName, query, sort, func ) {
		getCollection(collectionName, function(err,collection){
			if(err){
				console.error(err);
			}
			collection.find(query).sort(sort).toArray(func);
		});
	},

	insert : function( collectionName, document, func ) {
		getCollection(collectionName, function(err,collection){
			if(err){
				console.error(err);
			}
			collection.insert(document,func);
		});
	},

	update : function(collectionName,document,func) {
		getCollection(collectionName, function(err,collection){
			if(err){
				console.error(err);
			}
			collection.save(document,func);
		});
	},

	delete : function(collectionName, id, func) {
		getCollection(collectionName, function(err, collection) {
			if(err){
				console.error(err);
			}
			collection.remove( { _id: id }, true, func );
		});
	}
}

module.exports = database