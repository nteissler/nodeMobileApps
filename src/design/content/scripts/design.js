$(document).ready(function(){
	
	$(".list .app *:not(button)").on("touchstart mousedown", function(e){
		$(".wrapper").addClass("app-view");
	});

})