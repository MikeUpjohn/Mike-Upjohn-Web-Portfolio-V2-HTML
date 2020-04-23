var dailyRouteSource = {
			'type':'geojson',
			'data':
			{
				'type':'FeatureCollection',
				'features': [
					{
						'type': 'Feature',
						'properties': {
							'colour':'#F7455D',
							'day': 1,
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
					}
				]
			}
		}

		var routePoints = {
			'type': 'geojson',
			'data': 
			{
				'type': 'FeatureCollection',
				'features': [
					{
						'type':'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [-98.830593,32.371882]
						},
						'properties':{
							'day': 1,
							'description':'<b>Cisco, TX</b><br/><p>Stopped here for lunch before the storm chase began.</p><a style="font-weight:bold" href="http://www.mike-upjohn.co.uk/">Click to access BBC</a>',
						}
					},
					{
						'type':'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [-102.898511, 31.566852]
						},
						'properties':{
							'day': 1,
							'description':'<b>Monahans, TX</b><br/><p>Saw a nice storm here</p>'
						}
					},
					{
						'type':'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [-100.0198745727539,37.756329896849834]
						},
						'properties':{
							'day': 2,
							'description':'<b>Dodge City, KS</b><br/><p>Day 2 point here!</p>'
						}
					}
				]
				
			}
		};