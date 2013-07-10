$(document).ready(function(){
	
	$(".list .app").on("click", function(e){
		if(!$(e.target).is("button")){

			var id = $(this).attr('data-id');

			var template = new EJS({url: '/templates/releases.ejs'}).update('releases', '/api/apps/' + id);

			$(".wrapper").addClass("app-view");	
		}
	});

	$(".app").on("click", ".close", function(e){
		$(".wrapper").removeClass("app-view");
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