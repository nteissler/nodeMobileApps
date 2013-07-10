var path = require('path');
var join = path.join;
var fs = require('fs');

var lib = require('../lib');
var database = lib.database; 



exports.form = function(req,res){
	res.render('upload',{
		title: "New App Upload"
	});
};






exports.submit = function(dir,iconDir){
	return function(req,res,next){
		var appFile = req.files.app.file;
		var iconFile = req.files.app.icon;
		var appName = req.body.app.name;
		var appDesc = "temp descr";
		//don't forget to handle app description somehow
		var appPlat = req.body.app.platform;
		var appGroup = req.body.app.group;

		//also handle the security category
		console.log(dir);
		var appPath = join(dir,appFile.name);
		var iconPath = join(iconDir,iconFile.name);
		//save the files to proper location
		fs.rename(appFile.path,appPath,function(err){
			if(err) return next(err);
		});
		fs.rename(iconFile.path,iconPath,function(err){
			if(err) return next(err);
		});

		var appMongo = {
			name : appName,
			description : appDesc,
			//icon : iconPath,
			platform : appPlat,
			clientWorkingGroup : appGroup,
			isDevelopment : true,//temp
			releases : [] //temp
		}
		database.insert('apps', appMongo, function(err, results){
			res.redirect('/');
		});
		//upload the mongo object
		//save files to sc3
		

	}
};


exports.update = function(){
	return function(req,res,next){};
};
