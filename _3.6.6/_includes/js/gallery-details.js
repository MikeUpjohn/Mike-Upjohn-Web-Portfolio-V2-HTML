var imageUrl;
var caption;
var itemNumber;
var last;
var next;
var totalItems;

$(document).ready(function() {
	totalItems = $(".gallery-item").length;
});

$(".gallery-item").click(function(e) {
	e.preventDefault();

	imageUrl = $(this).data('imageurl');
	caption = $(this).data('caption');
	itemNumber = $(this).data('item');

	if(itemNumber === 0) {
		last = 0;
		next = itemNumber + 1;
	}
	else if(itemNumber === totalItems) {
		last = itemNumber - 1;
		next = 0;
	}

	fadeLightboxIn(imageUrl, caption);

	console.log(itemNumber);
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