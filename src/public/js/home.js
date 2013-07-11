$(document).ready(function(){
	
	$(".list .app").on("click", function(e){
		if(!$(e.target).is("button")){

			var id = $(this).attr('data-id');

			var template = new EJS({url: '/templates/app_detail.ejs'}).update('dialog', '/api/apps/' + id);

			$(".wrapper").addClass("dialog");	
		}

	});

	$(".list .admin").on("click",function(e){
		var id = $(this).attr('data-id');
		switch($(e.target).attr("data-action")){
			
			case "edit":
				alert("switch statement");
				var template = new EJS({url: '/templates/setup.ejs'}).update('dialog', '/api/apps/' + id);
				$(".wrapper").addClass("dialog");
				break;
			case "newVersion":
				var template = new EJS({url: '/templates/newRelease.ejs'}).update('dialog', '/api/apps/' + id);
				$(".wrapper").addClass("dialog");
				break;
		}
	});


	$("#dialog").on("click", ".close", function(e){
		$(".wrapper").removeClass("dialog");
	});

	$("#dialog").on("click", ".releases .release", function(e){
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