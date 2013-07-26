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
		var id = (req.body.release.id!=="")? new ObjectID(req.body.release.id): new ObjectID();
		console.log(id);

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


		database.find('apps',{_id:id},{},function(err,array){
			console.log(array);
			var doc = array[0];
			console.log(doc);
			if (doc.current){
				var oldRelease = doc.current;
				doc.releases.push(oldRelease);
				console.log(oldRelease);
			}
			doc.current = releaseMongo;
			database.update('apps', doc, function(err, results){	
						res.redirect('/');
			});
			//database.insertRelease('apps',{_id: id},{$addToSet:{"releases":oldRelease}});


		});
	}
}
