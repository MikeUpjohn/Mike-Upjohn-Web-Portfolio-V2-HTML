$(document).ready(function() {
	$(".gallery-item").mouseenter(function(e) {
		console.log("mouse entered");
		var galleryTitle = $(this).find($(".gallery-title"));
		var galleryItemHeight = $(this).find($(".gallery-image")).height();

		$(this).css({height: galleryItemHeight + 'px'});
		galleryTitle.css({ height: galleryItemHeight + 'px', bottom: galleryItemHeight + 'px'});

		$(this).find(".gallery-title").fadeIn(250);
	});

	$(".gallery-item").mouseleave(function(e) {
		$(this).find(".gallery-title").fadeOut(250);
	});

	setupGalleryTiles();
});

function setupGalleryTiles() {
	if(window.width < 991) {
		console.log("mobile view");

		$(".gallery-item").each(function() {
			var itemHeight = $(this).height();
			$(this).css({height: itemHeight + 'px'});
			$(this).find(".gallery-title").css({height: itemHeight + 'px', bottom: itemHeight + 'px'}).show();
		});
	}
}