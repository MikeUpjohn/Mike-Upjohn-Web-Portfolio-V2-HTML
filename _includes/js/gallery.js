$(document).ready(function() {
	$(".gallery-item").mouseenter(function(e) {
		console.log("mouse entered");
		var galleryTitle = $(this).find($(".gallery-title"));
		var galleryItemHeight = $(this).find($(".gallery-image")).height();

		$(this).css({height: galleryItemHeight + 'px'});
		galleryTitle.css({ height: galleryItemHeight + 'px', bottom: (galleryItemHeight + 1) + 'px'});

		$(this).find(".gallery-title").fadeIn(250);
	});

	$(".gallery-item").mouseleave(function(e) {
		$(this).find(".gallery-title").fadeOut(250);
	});
});