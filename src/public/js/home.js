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
					showDialogByApp($(this), '/app/:id/details');					
				}
			}else{
				showDialogByApp($(this), '/app/:id/details');
			}			
		}
	});

	$(".list, #dialog").on(eventstring, "button.admin", function(e){
		var id = $(this).attr('data-id');
		switch($(e.target).attr("data-action")) {
			case "edit":
				showDialogByApp($(this),'/app/:id/edit');
				break;
			case "newVersion":
				showDialogByApp($(this),'/app/:id/newRelease');
				break;
			case "delete":
				deletePrompt($(this));
				break;			
		}

	});


	$("#dialog").on(eventstring, ".close", function(e){
		closeDialog();
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
			showDialog('/app/new');
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

	$(".authenticate input").on("keydown")


})


var closeDialog = function(){
	$("body").removeClass("dialog");
	window.history.back();
}



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

	showDialog(templateUrl.replace(':id', id));
	console.log('/apps/'+element.find("h3").html()+"/"+element.data("platform"));

	window.history.pushState({}, element.find("h3").html()+" | "+element.data("platform"), '/apps/'+element.find("h3").html()+"/"+element.data("platform"));
}

var showDialog = function(templateUrl) {

	$('#content').html("<div class='loading'></div>");

	$("body").addClass("dialog");

	$.ajax({
		url: templateUrl,
		success: function(html) {
			$('#content').html(html);
		},
		error: function() {
			$('#content').html('<span>Whoops, something went wrong</span>');
		}
	});
}

var deletePrompt = function(element) {

	var response = confirm('Are you sure you want to delete this app?');
	if( response === true ) {
		var id = element.data('id');

		window.location.href = '/app/' + id + '/delete'; 
	}
}

function submit(appID) {


	$.ajax({
		'url': '/app/'+appID+'/authenticate',
		'data': { 
			password: $("#password").val()
		},
	    'type': 'POST',
	    // 'processData': false,
	    success: function(html) {
	    	var container = $("#dialog").length > 0 ? $("#dialog") : null;
	    	if(container){
	    		$('#dialog #content').html(html);	
	    	}else{
	    		$(".authenticate").remove();
	    		var app = $('<div class="application"></div>');
	    		app.append(html);
	    		$("body").append(app);
	    	}
	    }
	});

	return false;
}