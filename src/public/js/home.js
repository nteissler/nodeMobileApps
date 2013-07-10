$(document).ready(function(){
	
	$(".list .app").on("click", function(e){
		if(!$(e.target).is("button")){

			var template = new EJS({url: '/templates/releases.ejs'}).update('releases', {});

			$(".wrapper").addClass("app-view");	
		}
	});

	$(".app .back").on("click", function(e){
		$(".wrapper").removeClass("app-view");
	});

	$(".releases .release").on("click", function(e){
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