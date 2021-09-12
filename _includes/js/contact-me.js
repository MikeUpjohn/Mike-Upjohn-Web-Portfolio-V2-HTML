$(document).ready(function() {
	initMap();
});

function initMap() {
	let contactMap = $("#contact-map");
	mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZXVwam9obiIsImEiOiJjazk2enRjbHQwODB5M2xtanB6bGtoOW9zIn0.QKZt26yxRxYmzMa6i1RkYQ';
	map = new mapboxgl.Map({
		container: 'contact-map',
		style: 'mapbox://styles/mapbox/dark-v10',
		center: [-2.249217, 53.260956],
		zoom: 9
	});
}