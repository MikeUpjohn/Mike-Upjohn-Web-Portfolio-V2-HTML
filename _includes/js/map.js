var map;
var routesLayer;
var height = $(window).height();
var mapTopNavigationHeight = $("#flyout-map-close").outerHeight(true); // True to include margin

function loadStormChaseMap(e) {
    e.preventDefault();
    LockMap();

    $("#flyout-map").animate({"left":"0"}, "slow");
	$("#flyout-map-area").height(height - mapTopNavigationHeight);

	window.addEventListener('scroll', LockMap);

	LoadMap();
}

$("#flyout-map-close").click(function(e) {
	e.preventDefault();
	$("#flyout-map").animate({"left":"-1903"}, "slow"); // TODO: Make this dynamic...

	window.removeEventListener('scroll', LockMap);
});

function LockMap() {
  window.scrollTo(0, 0);
}

function LoadMap() {
	if($("#flyout-map-area").data('loaded') == false) {
		mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXVwam9obiIsImEiOiJjazk2enRjbHQwODB5M2xtanB6bGtoOW9zIn0.QKZt26yxRxYmzMa6i1RkYQ';
		map = new mapboxgl.Map({
			container: 'flyout-map-area',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-97.008434, 32.835795],
			zoom: 6
		});

		$("#flyout-map-area").data('loaded', true);

		

		map.on('load', function() {
			map.addSource('routes', dailyRouteSource);
			
		});
	}
}

function RefreshMap(day) {
	routesLayer = {
		'id':'route',
		'type':'line',
		'source':'routes',
		'layout': {
			'line-join':'round',
			'line-cap':'round'
		},
		'paint': {
			'line-width': 5,
			'line-color': ['get', 'colour']
		}
	};

	if(map.getLayer('route') !== undefined) {
		map.removeLayer('route');
	}

	map.addLayer(routesLayer);
	map.setFilter('route', ['==', 'day', day]);

	var markers = MarkersByDay(day);
	markers.forEach(function(marker) {
		var element = document.createElement('div');
		element.className = 'marker';

		new mapboxgl.Marker(element)
		.setLngLat(marker.geometry.coordinates)
		.setPopup(new mapboxgl.Popup({offset: 25})
			.setHTML(marker.properties.description))
		.addTo(map);
	});
}

function MarkersByDay(day) {
	return routePoints.data.features.filter(function(point) {
		return point.properties.day == day;
	});
}

$(".form-check-input").click(function(e) {
	var year = $(this).data('year');
	var day = $(this).data('day');

	RefreshMap(day);
})