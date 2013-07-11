//update app.js to route

var path = require('path');
var join = path.join;
var fs = require('fs');

var lib = require('../lib');
var database = lib.database; 



exports.form = function(req,res){
	res.render('setup',{
		title: "App Setup"
	});
};



exports.submit = function(iconDir){
	return function(req,res,next){
		//read in data from first app setup
		var iconFile = req.files.app.icon;
		var appName = req.body.app.name;
		var appDesc = req.body.app.desc;
		var appPlat = req.body.app.platform;
		var appGroup = req.body.app.group;
		var isDev = req.body.app.isDev;
		var isSec = req.body.app.isSecure;
		var isHidden = req.body.app.isHidden;
		var	pass = req.body.app.passcode;


		var iconPath = join(iconDir,iconFile.name);
		//save the files to proper location

		fs.rename(iconFile.path,iconPath,function(err){
			if(err) return next(err);
		});

		var appMongo = {
			name : appName,
			description : appDesc,
			icon : iconPath,
			platform : appPlat,
			clientWorkingGroup : appGroup,
			security: {
				development: (isDev=='on')?true:false,
				secured: (isSec=='on')?true:false,
				passcode: pass, //encrypt?
				hidden:(isHidden=='on')?true:false
			},
			current: {},
			releases : [{}]
		}
		console.log(appMongo);
		database.insert('apps', appMongo, function(err, results){
			res.redirect('/');
		});
		//upload the mongo object
		//save files to sc3
		

	}
};