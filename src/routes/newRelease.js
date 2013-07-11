//update app.js to route
var path = require('path');
var join = path.join;
var fs = require('fs');

var lib = require('../lib');
var database = lib.database; 


exports.form = function(req,res){
	res.render('',{
		appName: "App Setup" //get app name from where
	});
};


exports.submit = function(appDir){
	return function(req,res,next){
		//read in from release section
		var versionNum = req.body.release.version;
		var releaseNotes = req.body.release.notes;
		var appFile = req.files.release.file;


		var appPath = join(dir,appFile.name);
		//save the files to proper location
		fs.rename(appFile.path,appPath,function(err){
			if(err) return next(err);
		});

		var releaseMongo = {
				version: versionNum,
				notes: releaseNotes,
				file: appPath
			};


		database.insert('apps', appMongo, function(err, results){

			
			res.redirect('/');
		});
		//upload the mongo object
		//save files to sc3
		

	}
};