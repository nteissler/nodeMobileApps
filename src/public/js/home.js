$(document).ready(function(){
	
	$(".list .app").on("click", function(e){
		if(!$(e.target).is("button")){

			var id = $(this).attr('data-id');

			var template = new EJS({url: '/templates/releases.ejs'}).update('dialog', '/api/apps/' + id);

			$(".wrapper").addClass("dialog");	
		}
	});

	$("#dialog").on("click", ".close", function(e){
		$(".wrapper").removeClass("dialog");
	});

	$(".app").on("click", ".releases .release", function(e){
		if(!$(e.target).is("button")){
			$(this).toggleClass("active");
		}
	});	

	var navigation = responsiveNav("#nav", {
		label: "",
		insert: "before",
		open: function(){

		}
	});

})