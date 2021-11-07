var totalItems;
var imageUrl;
var caption;
var itemNumber;

$(document).ready(function() {
	totalItems = $(".gallery-item").length;
});

$(".gallery-item").click(function(e) {
	e.preventDefault();

	imageUrl = $(this).data('imageurl');
	caption = $(this).data('caption');
	itemNumber = $(this).data('item');

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
	$("#lightbox-gallery-image").attr('src', imageUrl);
	$("#gallery-caption").text(caption);
}

function loadLightbox() {
	$.when($("#lightbox .image-holder").add($("#lightbox-gallery-image")).add($("#lightbox .caption")).fadeIn(750)).done(function() {
		$("#lightbox").fadeIn(750);
		$("#lightbox").data('display', true);
	});
}