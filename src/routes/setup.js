//update app.js to route
//need to be able to update datebase not just add new every time

var path = require('path');
var join = path.join;
var fs = require('fs');

var lib = require('../lib');
var database = lib.database; 
var ObjectID = require('mongodb').ObjectID;




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

		var id = (req.body.app.id!=="")? new ObjectID(req.body.app.id): new ObjectID();

		if(iconFile.size !== 0){//if statement for debugging
			var iconPath = join(iconDir,iconFile.name);
			//save the files to proper location


			fs.rename(iconFile.path,iconPath,function(err){
				if(err) return next(err);
			});
		}

		if(req.body.app.id!='') {
			database.find('apps',{_id : id},{},function(err,appArray){

				if(err) return next(err);
				
				if(appArray){
					var updating = appArray[0];
					updating.name = appName;
					updating.description = appDesc;
					updating.icon = iconPath;
					updating.platform = appPlat;
					updating.clientWorkingGroup = appGroup;
					updating.security = {
						development: (isDev=='on')?true:false,
                    	secured: (isSec=='on')?true:false,
                    	passcode: pass, //encrypt?
                    	hidden:(isHidden=='on')?true:false
                	};
                	database.update('apps', updating, function(err, results){	
						res.redirect('/');
					});
				}
			});
		} else {

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
	                current: null,
	                releases : [{}]
            }
            database.insert('apps',appMongo,function(err,results){
            	res.redirect('/')
            });
		
			


		}

	}
};
