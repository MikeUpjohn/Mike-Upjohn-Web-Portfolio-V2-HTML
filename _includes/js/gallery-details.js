$(".gallery-image").click(function(e) {
	e.preventDefault();
	$.when($("#lightbox").fadeIn(750)).done(function() {
		$("#lightbox").data('display', true);
		$("#lightbox img").fadeIn(250);
	});
});

$("#gallery-image-close").click(function(e) {
	e.preventDefault();
	$("#lightbox").fadeOut(750);
	$("#lightbox img").hide();
	$("#lightbox").data('display', false);
});

$(".lightbox").click(function(e) {
	if($(this).data('display') == true) {
		$(".lightbox").fadeOut(750);
		$("#lightbox").data('display', false);
	}
})