var height = $(window).height();
var width = $(window).width();
var bannerImageHeight = 0;

SetBannerHeight();

$(window).resize(function() {
	height = $(window).height();
	SetBannerHeight();

	width = $(window).width();
	if(width >= 750) {
		$("#mobile-navigation-toggle").attr('aria-expanded','false');
		$("#main").animate({marginLeft:'0px'},'slow');  
	}
});

function GetBannerHeight() {
	if(height < 450) {
		bannerImageHeight = 450;
	}
	else {
		bannerImageHeight = height;
	}
}

function SetBannerHeight() {
	GetBannerHeight();
	
	if($("body").hasClass("homepage")) {
		$(".banner-image").height(bannerImageHeight);
	}
	else {
		if(bannerImageHeight*0.66 < 450) {
			$(".banner-image").height(450);
		}
		else {
			$(".banner-image").height(bannerImageHeight * 0.66);
		}
	}
}

$("#mobile-navigation-toggle").click(function() {
	var expanded = $(this).attr('aria-expanded');

	if(expanded == "true") {
		$(this).attr('aria-expanded','false');
		$("#main").animate({marginLeft:'0px'},'slow');   
	}
	else {
		$(this).attr('aria-expanded','true');
		$("#main").animate({marginLeft:'260px'},'slow');   
	}

	$(".navbar-toggle").blur();
});

var map;
var center = {lat: 53.286604, lng: -2.213044};

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: center,
		zoom: 12
	});

	map.setOptions({
		draggable: false,
		zoomControl: false,
		scrollWheel: false,
		disableDoubleClickZoom: true
	})
	
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);
	});
}

$(document).ready(function() {
	initMap();
});