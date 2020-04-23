var height = $(window).height();
var mapTopNavigationHeight = $("#flyout-map-close").outerHeight(true); // True to include margin

function loadStormChaseMap(e) {
    e.preventDefault();
    LockMap();
    console.log("called load storm chase stats...");

    $("#flyout-map").animate({"left":"0"}, "slow");
	$("#flyout-map-area").height(height - mapTopNavigationHeight);

	window.addEventListener('scroll', LockMap);

	LoadMap();
}

$("#flyout-map-close").click(function(e) {
	e.preventDefault();

	$("#flyout-map").animate({"left":"-1903"}, "slow");

	window.removeEventListener('scroll', LockMap);
});

function LockMap() {
  window.scrollTo(0, 0);
}

function LoadMap() {
	if($("#flyout-map-area").data('loaded') == false) {
		mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXVwam9obiIsImEiOiJjazk2enRjbHQwODB5M2xtanB6bGtoOW9zIn0.QKZt26yxRxYmzMa6i1RkYQ';
		var map = new mapboxgl.Map({
			container: 'flyout-map-area',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-97.008434, 32.835795],
			zoom: 6
		});

		$("#flyout-map-area").data('loaded', true);

		var featureCollection = {
			'type': 'geojson',
			'data': {
				'type': 'FeatureCollection',
				'features': [
					{
						'type': 'Feature',
							'properties': {
							'color':'#F7455D'
						},
						'geometry': {
							'type':'LineString',
							'coordinates':[
								[-97.007589,32.836157],
								[-97.347316,32.842589],
								[-97.461385,32.786883],
								[-97.483736,32.737301],
								[-97.570058,32.720443],
								[-97.696844,32.755452],
								[-98.369694,32.512379],
								[-98.830593,32.371882],
								[-100.337265,32.488242],
								[-101.442497,32.265628],
								[-102.902266,31.566934],
								[-102.848314,31.332861],
								[-102.888393,30.897362]
							]
						}
					},
					{
						'type':'Feature',
						'properties':{
							'description':'<b>Cisco, TX</b><br/><p>Stopped here for lunch before the storm chase began.</p><a style="font-weight:bold" href="http://www.mike-upjohn.co.uk/">Click to access BBC</a>',
							'icon':'rectangle-green'
						},
						'geometry': {
							'type': 'Point',
							'coordinates': [-98.830593,32.371882]
						}
					},
					{
						'type':'Feature',
						'properties':{
							'description':'<b>Monahans, TX</b><br/><p>Saw a nice storm here</p>',
							'icon':'rectangle-green'
						},
						'geometry': {
							'type': 'Point',
							'coordinates': [-102.898511, 31.566852]
						}
					}
				]
				
			}
		};

		var layer = {
			'id':'lines',
			'type':'line',
			'source':'day-1',
			'paint': {
				'line-width': 5,
				'line-color': ['get', 'color']
			},
			'filter': ['==', '$type','LineString']
		};

		var stops = {
			'id':'day-1-stops',
			'type':'symbol',
			'source':'day-1',
			'layout': {
				'icon-image': '{icon}-3',
				'icon-allow-overlap': true
			},
			'filter':['==','$type','Point']
		};

		map.on('load', function() {
			map.addSource('day-1', featureCollection);
			map.addLayer(layer);

			var points = featureCollection.data.features.filter(IsPoint)
			points.forEach(function(marker) {
				var element = document.createElement('div');
				element.className = 'marker';

				new mapboxgl.Marker(element)
				.setLngLat(marker.geometry.coordinates)
				.setPopup(new mapboxgl.Popup({offset: 25})
					.setHTML(marker.properties.description))
				.addTo(map);
			})

			/*map.on('click', 'day-1-stops', function(e) {
				var coordinates = e.features[0].geometry.coordinates.slice();
				var description = e.features[0].properties.description;

				while(Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}

				new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
			});*/

			/*map.on('mouseenter', 'day-1-stops', function() {
				map.getCanvas().style.cursor = 'pointer';
			});*/

			/*map.on('mouseleave', 'day-1-stops', function() {
				map.getCanvas().style.cursor = '';
			});*/
		});

		function IsPoint(marker) {
			return marker.geometry.type == "Point";
		} 
	}
}