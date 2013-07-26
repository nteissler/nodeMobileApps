//update app.js to route
//need to be able to update datebase not just add new every time

var path = require('path');
var join = path.join;
var fs = require('fs');

var lib = require('../lib');
var database = lib.database; 
var ObjectID = require('mongodb').ObjectID;




exports.submit = function(appDir){
	return function(req,res,next){
		//read in from release section
		var versionNum = req.body.release.version;
		var releaseNotes = req.body.release.notes;
		var appFile = req.files.release.file;
		var id = new ObjectID(req.body.app.id) || new ObjectID();

		if(appFile.size !==0){
		var appPath = join(appDir,appFile.name);
		//save the files to proper location
		fs.rename(appFile.path,appPath,function(err){
			if(err) return next(err);
		});
		}

		var releaseMongo = {
				version: versionNum,
				notes: releaseNotes,
				file: appPath
			};

			database.find(apps,{_id:id},{},function(err,appArray){
				var release = appArray[0];
			}
			}
			res.redirect('/');

		//upload the mongo object
		//save files to sc3
		

	}
};