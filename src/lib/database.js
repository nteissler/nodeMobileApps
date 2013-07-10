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

	find : function( collectionName, query, func ) {
		getCollection(collectionName, function(err,collection){
			collection.find(query).toArray(func);
		});
	},

	insert : function( collectionName, document, func ) {
		getCollection(collectionName, function(err,collection){
			collection.insert(document,func);
		});
	},

	update : function(collectionName,document,func) {
		getCollection(collectionName, function(err,collection){
			collection.save(document,func);
		});
	}
}

module.exports = database