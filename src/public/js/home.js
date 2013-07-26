/*** DETECT TOUCH SCREEN OR NORMAL SCREEN ***/
	var eventstring = ""
   	var el = document.createElement('div');
   	el.setAttribute('ongesturestart', 'return;');
   	if(typeof el.ongesturestart === "function"){
   		eventstring = "touchend";
   	}else{
   		eventstring = "click";
   		// eventstring = "touchend"; //for testing touch events in chrome
   }

 /***									 ***/

$(document).ready(function(){

	$.cookie.json = true;

	var user = $.cookie('user');
	
	if(eventstring == "touchend"){
		var fullstring = "touchstart touchend";	
	}else{
		fullstring = eventstring;
	}
	
	var eventCache = {
		startY: null
	}
	$(".list .app").on(fullstring, function(e){
		if(e.type == "touchstart"){
			eventCache.startY = e.originalEvent.touches[0].pageY;
		}

		if(!$(e.target).is("button") && e.type != "touchstart"){
			if(e.type == "touchend"){
				if(Math.abs(e.originalEvent.changedTouches[0].pageY - eventCache.startY) < 10){
					showDialogByApp($(this), '/templates/app_detail.ejs');					
				}
			}else{
				showDialogByApp($(this), '/templates/app_detail.ejs');
			}
			
		}
	});

	$(".list .admin").on(eventstring,function(e){
		var id = $(this).attr('data-id');
		switch($(e.target).attr("data-action")){
			
			case "edit":
				showDialogByApp($(this),'/templates/setup.ejs');
				break;
			case "newVersion":
				showDialogByApp($(this),'/templates/newRelease.ejs');
				break;
		}
	});


	$("#dialog").on(eventstring, ".close", function(e){
		$("body").removeClass("dialog");
	});

	$("#dialog, .application").on(eventstring, ".releases .release", function(e){
		if(!$(e.target).is("button")){
			console.log(e);
			$(this).toggleClass("active");
		}
	});	

	if($("#nav").length > 0){
		var navigation = responsiveNav("#nav", {
			label: "",
			insert: "before",
			open: function(){

			}
		});

		$("nav .admin").on(eventstring, function() {
			var app = { 
				app : {
					name : '',
					description : '',
					icon : null,
					platform : '',
					clientWorkingGroup : '',
					security : {
						development : true,
						secured : false,
						passcode : '',
						hidden : false
					},
					current : null,
					releases : []
				}
			};
			
			renderDialog("/templates/setup.ejs", app);			
	} );
	}


	$(".platform").on(eventstring, function(e){
		filterPlatform($(this).text());
		$(".platform").removeClass("active");
		$(this).addClass("active");
		$('.filterMessage').text("Apps for: " + $(this).text());
		$('.filterStatus').show();
	});

	$('.filterStatus').hide();	

	$(".showAll").on(eventstring,function(){
		$(".filterStatus").hide();
		$(".platform").removeClass("active");
		filterPlatform("");
	});


})


var filterPlatform = function(platform){
	var formattedPlatform = platform.trim().toLowerCase();
	$(".list .app").each(function(){
		if (platform==="") $(this).show();
		//alert($(this).data('platform') + "..."+formattedPlatform);
		else if($(this).data("platform").toLowerCase()!==formattedPlatform){
			$(this).hide();	
		} else if($(this).data("platform").toLowerCase()===formattedPlatform) {
			$(this).show();
		}
			
		
	});
}

var showDialogByApp = function( element, templateUrl ) {

	var id = element.data('id');

	showDialog(templateUrl, '/api/apps/' + id);
}

var showDialog = function( templateUrl, ajaxUrl ) {

	$('#content').html("<div class='loading'></div>");

	var template = new EJS({url: templateUrl}).update('content', ajaxUrl);

	$("body").addClass("dialog");
}

var renderDialog = function( templateUrl, data )  {

	$('#content').html("<div class='loading'></div>");

	$("#content").html(new EJS({url: templateUrl}).render(data));

	$("body").addClass("dialog");
}