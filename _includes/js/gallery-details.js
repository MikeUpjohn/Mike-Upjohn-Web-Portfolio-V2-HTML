$(".gallery-image").click(function(e) {
	e.preventDefault();
	$.when($("#lightbox").fadeIn(750)).done(function() {
		$("#lightbox").data('display', true);
		$("#lightbox .image-holder img").fadeIn('slow');
		$("#lightbox .caption").fadeIn('slow');
	});
});

$("#gallery-image-close").click(function(e) {
	e.preventDefault();
	$("#lightbox").fadeOut(750);
	$("#lightbox .image-holder img").hide();
	$("#lightbox .caption").hide();
	$("#lightbox").data('display', false);
});

$(".lightbox").click(function(e) {
	if($(this).data('display') == true) {
		$(".lightbox").fadeOut(750);
		$("#lightbox .image-holder img").hide();
		$("#lightbox .caption").hide();
		$("#lightbox").data('display', false);
	}
})