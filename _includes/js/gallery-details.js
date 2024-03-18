var totalItems;
var imageUrl;
var caption;
var itemNumber;

$(document).ready(function() {
	totalItems = $(".gallery-item").length;
});

$(".gallery-item").click(function(e) {
	e.preventDefault();

	var screenWidth = window.width;

	if(screenWidth >= 991) {
		imageUrl = $(this).data('imageurl');
		caption = $(this).data('caption');
		itemNumber = $(this).data('item');
		
		fadeLightboxIn(imageUrl, caption);
	}
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

	if(itemNumber === 1) {
		itemNumber = totalItems;
	}
	else {
		itemNumber--;
	}

	var lastItem = $(".gallery-item[data-item='" + itemNumber + "']");
	changeGalleryImage(lastItem.data("imageurl"), lastItem.data("caption"));
	updateGalleryImageCaptionPosition();
});

$("#next-gallery-item").click(function(e) {
	e.stopPropagation();
	e.preventDefault();

	if(itemNumber === totalItems) {
		itemNumber = 1;
	}
	else {
		itemNumber++;	
	}

	var nextItem = $(".gallery-item[data-item='" + itemNumber + "']");
	changeGalleryImage(nextItem.data("imageurl"), nextItem.data("caption"));
	updateGalleryImageCaptionPosition();
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
	$('#gallery-image-container img').attr('src', imageUrl);

	$("#lightbox-gallery-image").attr('src', imageUrl);
	$("#gallery-caption").text(caption);
	$('#image-holder').css("width", $('#gallery-image-container img').width());
	$('#image-holder').css("height", $('#gallery-image-container img').height());
}

function loadLightbox() {
	$.when($("#lightbox .image-holder").add($("#lightbox-gallery-image")).add($("#lightbox .caption")).fadeIn(750)).done(function() {
		$("#lightbox").fadeIn(750);
		updateGalleryImageCaptionPosition();
		$("#lightbox").data('display', true);
	});
}

function updateGalleryImageCaptionPosition() {
	$("#gallery-caption").css("width", $("#image-holder").outerWidth());
}