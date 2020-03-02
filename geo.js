var lat = document.getElementById("lat");
var long = document.getElementById("long");
var curr = document.getElementById("curr");

var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/';
var yelp_search_url = cors_anywhere_url + "https://api.yelp.com/v3/businesses/search?latitude=LAT&longitude=LONG";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    curr.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat.innerHTML = position.coords.latitude;
  long.innerHTML = position.coords.longitude;
  curr.innerHTML = "Current Location: (" + position.coords.latitude +
  ", " + position.coords.longitude + ")";
}


function initMap() {
  var latf = parseFloat(lat.innerHTML);
  var longf = parseFloat(long.innerHTML);

  var cent = {lat: latf, lng: longf};

  var map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: cent});

  // var marker = new google.maps.Marker({position: uluru, map: map});
}

function display(body){
  console.log(body);
  var latf = parseFloat(lat.innerHTML);
  var longf = parseFloat(long.innerHTML);

  var cent = {lat: latf, lng: longf};

  var map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: cent});

  var count;
  if (body.total < 10) {
    count = body.total;
  }
  else {
    count = 10;
  }
  var i;
  for (i = 0; i < count; i++)
  {
    var latn = parseFloat(body.businesses[i].coordinates.latitude);
    var longn = parseFloat(body.businesses[i].coordinates.longitude);

    var pos = {lat: latn, lng: longn}
    var marker = new google.maps.Marker({position: pos, map: map})
  }
}

function performSearch() {
	// var city = 'boston';  // get this from user input
	// var term = 'burger';  // get this from user input
  var latitude = parseFloat(lat.innerHTML);
  var longitude = parseFloat(long.innerHTML);
  var search_url = yelp_search_url.replace("LAT",latitude);
  var search_url = search_url.replace("LONG",longitude);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', search_url, true);

  xhr.setRequestHeader("Authorization", "Bearer " + "HS2Hz1mCXhn6mREVBIRfmDo2HLbHM8j09hVmLAjfNLBZg1P9svADfcr4zq7tISjYvPPEo-hNf02vWZF94VWM9egXvCux8SXMUcQ2IpyKb4foYVTZbhIv1apKHbBaXnYx");
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
             display(JSON.parse(xhr.response));
           }
    };
  xhr.send();
}
