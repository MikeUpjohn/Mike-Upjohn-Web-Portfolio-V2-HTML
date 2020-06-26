$(".gallery-image").click(function(e) {
	e.preventDefault();
	$("#lightbox").fadeIn('slow');
});

$("#gallery-image-close").click(function(e) {
	e.preventDefault();
	$("#lightbox").fadeOut('slow');
})