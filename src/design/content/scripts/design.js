$(document).ready(function(){
	
	$(".list .app").on("click", function(e){
		if(!$(e.target).is("button")){
			$(".wrapper").addClass("dialog");	
		}
		
	});

	$(".app .close").on("click", function(e){
		$(".wrapper").removeClass("dialog");
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