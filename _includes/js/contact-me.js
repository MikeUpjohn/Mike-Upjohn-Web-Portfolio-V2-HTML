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