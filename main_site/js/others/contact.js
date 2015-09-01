function initialize() {
		  var mapOptions = {
			zoom: 10,
			scrollwheel: false,
			center: new google.maps.LatLng(28.4700, 77.0300)
		  };

		  var map = new google.maps.Map(document.getElementById('googleMap'),
			  mapOptions);


		  var marker = new google.maps.Marker({
			position: map.getCenter(),
			animation:google.maps.Animation.BOUNCE,
			icon: 'images/map-marker.png',
			map: map
		  });

		}
google.maps.event.addDomListener(window, 'load', initialize);
