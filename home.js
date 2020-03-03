var lat = document.getElementById("lat");
var long = document.getElementById("long");
var curr = document.getElementById("curr");
var load = document.getElementById("load");
var city;
var currCount = 0;
table = document.getElementById("table");

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
}

function nearByEventsMap() {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
            address: city
        }, function (results, status) {
            if (status === 'OK') {
                const result = results[0].geometry.location;
                lat.innerHTML = result.lat().toString();
                long.innerHTML = result.lng().toString();
                console.log(lat.innerHTML);
                console.log(long.innerHTML);
            }
        })
}


function initMap() {
  var latf = parseFloat(lat.innerHTML);
  var longf = parseFloat(long.innerHTML);

  var cent = {lat: latf, lng: longf};

  var map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: cent});

  // var marker = new google.maps.Marker({position: uluru, map: map});
}

function display(body){
  console.log(body);
  resetTable();
  var num = 10;
  var latf = parseFloat(lat.innerHTML);
  var longf = parseFloat(long.innerHTML);

  var cent = {lat: latf, lng: longf};

  var map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: cent});

  var count;
  if (body.total < num) {
    count = body.total;
    currCount = 0;
  }
  else if (body.total < num + currCount) {
    count = num;
    currCount = 0;
  }
  else {
    count = num;
  }
  var i;
  for (i = currCount; i < count + currCount; i++)
  {
    var latn = parseFloat(body.businesses[i].coordinates.latitude);
    var longn = parseFloat(body.businesses[i].coordinates.longitude);

    var pos = {lat: latn, lng: longn}
    var marker = new google.maps.Marker({position: pos, label: body.businesses[i].name, map: map})

    var newRow = table.insertRow(table.length);
    var cell0 = newRow.insertCell(0);
    cell0.innerHTML = body.businesses[i].name + "   ";
    var cell1 = newRow.insertCell(1);
    cell1.innerHTML = body.businesses[i].location.address1 + "   ";
    var cell2 = newRow.insertCell(2);
    cell2.innerHTML = body.businesses[i].rating;

  }
  load.innerHTML = "";
  currCount = currCount + count;
  console.log("curr");
  console.log(currCount);

}

function performSearch() {
  load.innerHTML = "Currently Loading";
  var latitude = parseFloat(lat.innerHTML);
  var longitude = parseFloat(long.innerHTML);
  var search_url = yelp_search_url.replace("LAT",latitude);
  var search_url = search_url.replace("LONG",longitude);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', search_url, true);

  xhr.setRequestHeader("Authorization", "Bearer " + "tUt_Mg6HvQqVlea9-FWuYIXVOY8UeVJ28zLPgQVanAT_it7m5TykzgMn4-m008g2UJHeS50P5o3knVsRBs1V2BIbsCJbBrEQMn0P5b0Zy-sOsPEfCv-H9cSWyrheXnYx");
    xhr.onreadystatechange = function() {
     if (xhr.readyState == 4 && xhr.status == 200) {
             display(JSON.parse(xhr.response));
           }
    };
  xhr.send();
}

function changeCity() {
  document.getElementById("home").style.display="none";
	document.getElementById("new").style.display="block";
  city = document.getElementById("inputCity").value;
  nearByEventsMap();
}

function changeCurr() {
  document.getElementById("home").style.display="none";
	document.getElementById("new").style.display="block";
  getLocation();
}

function resetTable() {
  var tableRows = table.getElementsByTagName('tr');
  var rowCount = tableRows.length;
  console.log(rowCount);
  for (var x=rowCount-1; x>0; x--) {
     table.deleteRow(x);
  }
}

function restart() {
  document.getElementById("home").style.display="block";
	document.getElementById("new").style.display="none";
  resetTable();
  currCount = 0;
  initMap();
}
