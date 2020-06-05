let map;
let routesLayer;
let mapTopNavigationHeight = $("#flyout-map-close").outerHeight(true); // True to include margin
let activeMarkers = [];

$("#storm-chase-map").click(function(e) {
 	e.preventDefault();

    lockMap();

	$("#flyout-map").width($(window).width()); // double check the width. Fix for some pages...
    $("#flyout-map").animate({"left":"0"}, "slow");
	$("#flyout-map-area").height($(window).height() - mapTopNavigationHeight);

	window.addEventListener('scroll', lockMap);

	loadMap();
});

$("#flyout-map-close").click(function(e) {
	e.preventDefault();
	$("#flyout-map").animate({"left":"-1903"}, "slow"); // TODO: Make this dynamic...

	window.removeEventListener('scroll', lockMap);
});

$(".control-panel .form-check-input").click(function(e) {
	e.stopPropagation();

	let checkbox = $(this);
	let isParent = checkbox.hasClass("parent");

	if(isParent) {
		let isParentChecked = checkbox.prop('checked');
		// check all child checkboxes and then load all map days...
		
		let subCheckboxes = checkbox.parent().find(".sub-checkboxes");
		if(subCheckboxes.hasClass("in")) {
			// This section expanded already
			if(isParentChecked) {
				checkbox.parent().find(".sub-checkboxes input:checkbox").prop('checked', true);
			}
			else {
				checkbox.parent().find(".sub-checkboxes").collapse('hide');
				checkbox.parent().find(".sub-checkboxes input:checkbox").prop('checked', false);
			}
		}
		else {
			// This section is closed - expand and check checkboxes
			checkbox.parent().find(".sub-checkboxes").collapse('show');
			checkbox.parent().find(".sub-checkboxes input:checkbox").prop('checked', true);
		}
	}

	refreshMap();
});

function lockMap() {
  window.scrollTo(0, 0);
}

function loadMap() {
	let flyoutMap = $("#flyout-map-area");

	if(flyoutMap.data('loaded') == false) {
		mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXVwam9obiIsImEiOiJjazk2enRjbHQwODB5M2xtanB6bGtoOW9zIn0.QKZt26yxRxYmzMa6i1RkYQ';
		map = new mapboxgl.Map({
			container: 'flyout-map-area',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-97.008434, 32.835795], // TODO: Make this dynamic...
			zoom: 6
		});

		flyoutMap.data('loaded', true);
	}
}

function refreshMap() {
	let allCheckboxes = $(".form-check-input:checked").toArray();
	routeTemplate.data.features = [];
	markerTemplate.data.features = [];

	if(map.getLayer('route') !== undefined) {
		map.removeLayer('route');
	}

	if(map.getSource('route') !== undefined) {
		map.removeSource('route');
	}

	activeMarkers.forEach(function(marker) {
		marker.remove();
	});

	activeMarkers = [];

	allCheckboxes.forEach(function(checkbox) {
		let thisCheckboxYear = $(checkbox).data('year');
		let thisCheckboxDay = $(checkbox).data('day');

		let thisDayRoute = route.filter(function(routeItem) {
			return routeItem.properties.year == thisCheckboxYear && routeItem.properties.day == thisCheckboxDay;
		});

		let thisDayMarkers = markers.filter(function(marker) {
			return marker.properties.year == thisCheckboxYear && marker.properties.day == thisCheckboxDay;
		});

		routeTemplate.data.features.push(...thisDayRoute);
		markerTemplate.data.features.push(...thisDayMarkers);
	});

	map.addSource('route', routeTemplate);

	routesLayer = {
		'id':'route',
		'type':'line',
		'source':'route',
		'layout': {
			'line-join':'round',
			'line-cap':'round'
		},
		'paint': {
			'line-width': 5,
			'line-color': ['get', 'colour'],
			'line-blur': 2
		}
	};

	map.addLayer(routesLayer);

	markerTemplate.data.features.forEach(function(marker) {
		let element = document.createElement('div');
		element.className = 'marker';

		let currentMarker = new mapboxgl.Marker(element)
		.setLngLat(marker.geometry.coordinates)
		.setPopup(new mapboxgl.Popup({offset: 25})
		.setHTML(marker.properties.description))
		.addTo(map);

		activeMarkers.push(currentMarker);
	});
}
