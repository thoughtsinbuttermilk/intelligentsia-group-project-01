var openWeatherAPIKey = "e65d2cbe1dd88ddf7e7269cfa2943d10";

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 10,
  });

  var markers = [];
  var maxMarkers = 7;

  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      var zipCode = document.getElementById("nameEntryInput").value;
      if (zipCode) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: zipCode }, function (results, status) {
          if (status === "OK") {
            var location = results[0].geometry.location;

            var service = new google.maps.places.PlacesService(map);

            service.nearbySearch(
              {
                location: location,
                radius: 12187.2, // 20 miles in meters
                //type: ['park'],
                keyword: "skatepark",
              },
              function (results, status) {
                if (status === "OK") {
                  clearMarkers();
                  displaySkateparkResults(results.slice(0, maxMarkers));
                  for (var i = 0; i < results.length && i < maxMarkers; i++) {
                    createMarker(results[i]);
                  }
                }
              }
            );

            map.setCenter(location);
          } else {
          }
        });
      } else {
      }
    });

  function createMarker(place) {
    if (markers.length >= maxMarkers) return;

    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });

    var infowindow = new google.maps.InfoWindow({
      content: place.name,
    });

    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });

    markers.push(marker);
  }

  function clearMarkers() {
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];
  }

  function displaySkateparkResults(results) {
    var skateparkList = document.getElementById("skateparkList");
    skateparkList.innerHTML = "";
    results.forEach(function (result) {
      var skateparkBox = document.createElement("div");
      skateparkBox.classList.add("skatepark-box");

      var name = document.createElement("p");
      name.textContent = result.name;
      skateparkBox.appendChild(name);

      if (result.vicinity) {
        var address = document.createElement("p");
        address.textContent = result.vicinity;
        skateparkBox.appendChild(address);
      }

      skateparkList.appendChild(skateparkBox);
    });
  }
}
// put the values in the html elements for rendering to screen
function renderCityWeather(d) {
	// var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	document.getElementById('description').innerHTML = d.weather[0].description;
	// should probably make this conditional based on whether the weather is reported in fahrenheit or celcius
  document.getElementById('temp').innerHTML = fahrenheit + '&deg; F';
	document.getElementById('location').innerHTML = d.name;
}

function cityWeather(cityID) {
  var apiKey = 'e65d2cbe1dd88ddf7e7269cfa2943d10';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + apiKey)  
  // convert response to .json
  .then(function(resp) { return resp.json() }) 
  .then(function(data) {
    renderCityWeather(data);
  })
  .catch(function() {
  });
}

window.onload = function() {
  // need to get the city from the user input
  cityWeather(5809844);
}


