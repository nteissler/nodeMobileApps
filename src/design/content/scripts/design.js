$(document).ready(function(){
	
	$(".list .app *:not(button)").on("click", function(e){
		$(".wrapper").addClass("app-view");
	});

	$(".app .back").on("click", function(e){
		$(".wrapper").removeClass("app-view");
	});

	$(".releases .release *:not(button)").on("click", function(e){
		$(this).parents(".release").toggleClass("active");
	});	

})