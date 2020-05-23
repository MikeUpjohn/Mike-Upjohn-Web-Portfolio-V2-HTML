var map;
var routesLayer;
var routesLayer2;
var height = $(window).height();
var mapTopNavigationHeight = $("#flyout-map-close").outerHeight(true); // True to include margin
var activeMarkers = [];

$("#storm-chase-map").click(function(e) {
 	e.preventDefault();
    LockMap();

    $("#flyout-map").animate({"left":"0"}, "slow");
	$("#flyout-map-area").height(height - mapTopNavigationHeight);

	window.addEventListener('scroll', LockMap);

	LoadMap();
});

$("#flyout-map-close").click(function(e) {
	e.preventDefault();
	$("#flyout-map").animate({"left":"-1903"}, "slow"); // TODO: Make this dynamic...

	window.removeEventListener('scroll', LockMap);
});

function LockMap() {
  window.scrollTo(0, 0);
}

function LoadMap() {
	var flyoutMapArea = $("#flyout-map-area");

	if(flyoutMapArea.data('loaded') == false) {
		mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXVwam9obiIsImEiOiJjazk2enRjbHQwODB5M2xtanB6bGtoOW9zIn0.QKZt26yxRxYmzMa6i1RkYQ';
		map = new mapboxgl.Map({
			container: 'flyout-map-area',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-97.008434, 32.835795], // TODO: Make this dynamic...
			zoom: 6
		});

		flyoutMapArea.data('loaded', true);
	}
}

function RefreshMap() {
	var allCheckboxes = $(".form-check-input:checked").toArray();
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

		var thisDayRoute = route.filter(function(routeItem) {
			return routeItem.properties.year == thisCheckboxYear && routeItem.properties.day == thisCheckboxDay;
		});

		var thisDayMarkers = markers.filter(function(marker) {
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
			'line-color': ['get', 'colour']
		}
	};

	map.addLayer(routesLayer);

	markerTemplate.data.features.forEach(function(marker) {
		var element = document.createElement('div');
		element.className = 'marker';

		var currentMarker = new mapboxgl.Marker(element)
		.setLngLat(marker.geometry.coordinates)
		.setPopup(new mapboxgl.Popup({offset: 25})
			.setHTML(marker.properties.description))
		.addTo(map);

		activeMarkers.push(currentMarker);
	});
}

$(".form-check-input").click(function(e) {
	var clickedCheckbox = $(this);

	e.stopPropagation();
	var isParent = clickedCheckbox.hasClass("parent");

	if(isParent) {
		var isParentChecked = clickedCheckbox.prop('checked');
		// check all child checkboxes and then load all map days...
		// expand child checkboxes
		var subCheckboxes = clickedCheckbox.parent().find(".sub-checkboxes");

		if(subCheckboxes.hasClass("in")) {
			// This section expanded already

			if(isParentChecked) {
				clickedCheckbox.parent().find(".sub-checkboxes input:checkbox").prop('checked', true);
				var checkedSubCheckboxes = $(subCheckboxes.find("input:checkbox:checked"));

				for(var i = 0; i < checkedSubCheckboxes.length; i++) {
					var item = $(checkedSubCheckboxes[i]);
				}
			}
			else {
				clickedCheckbox.parent().find(".sub-checkboxes").collapse('hide');
				clickedCheckbox.parent().find(".sub-checkboxes input:checkbox").prop('checked', false);
			}
			
		}
		else {
			// This section is closed - expand and checkboxes

			clickedCheckbox.parent().find(".sub-checkboxes").collapse('show');
			clickedCheckbox.parent().find(".sub-checkboxes input:checkbox").prop('checked', true);

			var checkedSubCheckboxes = $(subCheckboxes.find("input:checkbox:checked"));

			for(var i = 0; i < checkedSubCheckboxes.length; i++) {
				var item = $(checkedSubCheckboxes[i]);
			}
		}
	}
	else {
		var year = $(this).data('year');
		var day = $(this).data('day');
	}

	RefreshMap();
});
