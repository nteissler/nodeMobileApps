$(document).ready(function(){
	
	$(".list .app").on("click", function(e){
		if(!$(e.target).is("button")){

			showDialogByApp($(this), '/templates/app_detail.ejs');			
		}
	});

	$(".list .admin").on("click",function(e){
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


	$("#dialog").on("click", ".close", function(e){
		$(".wrapper").removeClass("dialog");
	});

	$("#dialog, .application").on("click", ".releases .release", function(e){
		if(!$(e.target).is("button")){
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
	}
	

})

var showDialogByApp = function( element, templateUrl ) {

	var id = element.data('id');

	showDialog(templateUrl, '/api/apps/' + id);
}

var showDialog = function( templateUrl, ajaxUrl ) {

	$('#content').html("<div class='loading'></div>");

	var template = new EJS({url: templateUrl}).update('content', ajaxUrl);

	$(".wrapper").addClass("dialog");
}