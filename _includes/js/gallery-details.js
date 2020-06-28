$(".gallery-image").click(function(e) {
	e.preventDefault();
	fadeImageIn();
});

$("#gallery-image-close").click(function(e) {
	e.preventDefault();
	fadeImageOut();
});

$(".lightbox").click(function(e) {
	if($(this).data('display') == true) {
		fadeImageOut();
	}
});

function fadeImageIn() {
	$.when($("#lightbox").fadeIn(750)).done(function() {
		$("#lightbox").data('display', true);
		$.when($("#lightbox .image-holder img").fadeIn('slow')).done(function() {
			$("#lightbox .image-holder").fadeIn('slow');
			$("#lightbox .caption").fadeIn('slow');	
		});
	});
}

function fadeImageOut() {
	$("#lightbox").fadeOut(750);
	$.when($("#lightbox .image-holder").fadeOut('slow')).done(function(){
		$("#lightbox .image-holder img").hide();
		$("#lightbox .caption").hide();
		$("#lightbox").data('display', false);
	});
}