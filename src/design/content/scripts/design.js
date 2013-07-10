$(document).ready(function(){
	
	$(".list .app").on("click", function(e){
		if(!$(e.target).is("button")){
			$(".wrapper").addClass("app-view");	
		}
		
	});

	$(".app .close").on("click", function(e){
		$(".wrapper").removeClass("app-view");
	});

	$(".releases").on("click", ".release", function(e){
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