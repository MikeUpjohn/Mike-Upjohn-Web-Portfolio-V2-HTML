var imageUrl;
var caption;
var itemNumber;
var last;
var next;
var totalItems;

$(".gallery-item").click(function(e) {
	e.preventDefault();

	imageUrl = $(this).data('imageurl');
	caption = $(this).data('caption');
	itemNumber = $(this).data('item');
	totalItems = $("#gallery-item").length;

	if(itemNumber === 0) {
		last = 0;
		next = itemNumber++;
	}
	else if(itemNumber === totalItems) {
		last = itemNumber--;
		next = 0;
	}

	fadeLightboxIn(imageUrl, caption);
});

$("#gallery-image-close").click(function(e) {
	e.preventDefault();
	fadeLightboxOut();
});

$(".lightbox").click(function(e) {
	if($(this).data('display') == true) {
		fadeLightboxOut();
	}
});

$("#previous-gallery-item").click(function(e) {
	e.stopPropagation();
	e.preventDefault();

	// get last image data
	console.log("go left");

});

$("#next-gallery-item").click(function(e) {
	e.stopPropagation();
	e.preventDefault();

	// get next image data
	console.log("go right");
});

function fadeLightboxIn(imageUrl, caption) {
	changeGalleryImage(imageUrl, caption);
	loadLightbox();
}

function fadeLightboxOut() {
	$.when($("#lightbox").fadeOut(750)).done(function() {
		$("#lightbox .image-holder").hide();
		$("#lightbox .image-holder img").hide();
		$("#lightbox .caption").hide();
		$("#lightbox").data('display', false);
	});
}

function changeGalleryImage(imageUrl, caption) {
	$("#lightbox .image-holder img").attr('src', imageUrl);
	$("#lightbox .caption span").text(caption);
}

function loadLightbox() {
	$.when($("#lightbox .image-holder").add($("#lightbox .image-holder img")).add($("#lightbox .caption")).fadeIn(750)).done(function() {
		$("#lightbox").fadeIn(750);
		$("#lightbox").data('display', true);
	});		
}