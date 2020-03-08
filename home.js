var lat = document.getElementById("lat");
var long = document.getElementById("long");
var cat = "restaurants";
var curr = document.getElementById("curr");
var load = document.getElementById("load");
var city;
var currCount = 0;
var table = document.getElementById("table");
var validcategories = ["restaurants", "afghani", "african", "newamerican", "tradamerican", "andalusian", "arabian", "argentine", "armenian", "asianfusion", "asturian", "australian", "austrian", "baguettes", "bangladeshi", "bbq", "basque", "bavarian", "beergarden", "beerhall",
"beisl", "belgian", "bistros", "blacksea", "brasseries", "brazilian", "breakfast_brunch", "british", "buffets", "bulgarian", "burgers", "burmese", "cafes", "cafeteria", "cajun", "cambodian", "newcanadian", "canteen", "caribbean", "catalan", "cheesesteaks", "chickenshop", "chicken_wings", "chilean",
"chinese", "comfortfood", "corsican", "creperies", "cuban", "currysausage", "cypriot", "czech", "czechslovakian", "danish", "delis", "diners", "dinnertheater", "dumplings", "eastern_european", "eritrean", "ethiopian", "hotdogs", "filipino", "fischbroetchen", "fishnchips", "flatbread", "fondue", "food_court",
"foodstands", "freiduria", "french", "sud_ouest", "galician", "gamemeat", "gastropubs", "georgian", "german", "giblets", "gluten_free", "greek", "guamanian", "halal", "hawaiian", "heuriger", "himalayan", "honduran", "hkcafe", "hotdog", "hotpot", "hungarian", "iberian", "indpak", "indonesian", "international",
"irish", "island_pub", "israeli", "italian", "japanese", "jewish", "kebab", "kopitiam", "korean", "kosher", "kurdish", "loas", "loatian", "latin", "raw_food", "lyonnais", "malaysian", "meatballs", "mediterranean", "mexican", "mideastern", "milkbars", "modern_australian", "modern_european", "mongolian",
"moroccan", "newmexican", "newzealand", "nicaraguan", "nightfood", "nikkei", "noodles", "norcinerie", "opensandwiches", "oriental", "pfcomercial", "pakistani", "panasian", "eltern_cafes", "parma", "persian", "peruvian", "pita", "pizza", "polish", "polynesian", "popuprestaurants", "portuguese", "potatoes",
"poutineries", "pubfood", "riceshop", "romanian", "rotisserie_chicken", "russian", "salad", "sandwiches", "scandinavian", "schnitzel", "scottish", "seafood", "serbocroatian", "signature_cuisine", "singaporean", "slovakian", "somali", "soulfood", "soup", "southern", "spanish", "srilankan", "steak", "supperclubs",
"sushi", "swabian", "swedish", "swissfood", "syrian", "tabernas", "taiwanese", "tapas", "tapasmallplates", "tavolacalda", "tex-mex", "norwegian", "traditional_swedish", "trattorie", "turkish", "ukrainian", "uzbek", "vegan", "vegetarian", "venison", "vietnamese", "waffles", "wok", "wraps", "yugoslav"];

var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/';
var yelp_search_url = cors_anywhere_url + "https://api.yelp.com/v3/businesses/search?latitude=LAT&longitude=LONG&limit=50&categories=CAT";

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

  var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: cent});

  // var marker = new google.maps.Marker({position: uluru, map: map});
}

function display(body){
  console.log(body);
  resetTable();
  var num = 10;
  var latf = parseFloat(lat.innerHTML);
  var longf = parseFloat(long.innerHTML);

  var cent = {lat: latf, lng: longf};

  var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: cent});

  var count;
  if (body.total == 0) {
    count = 0;
    var newRow = table.insertRow(table.length);
    var cell0 = newRow.insertCell(0);
    cell0.innerHTML = "No restaurants available";
  }
  else if (body.total < num) {
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
  if (50 < count + currCount) {
    currCount = 0;
  }
  var i;
  for (i = currCount; i < count + currCount; i++)
  {
    console.log(body.businesses[i]);
    var latn = parseFloat(body.businesses[i].coordinates.latitude);
    var longn = parseFloat(body.businesses[i].coordinates.longitude);

    var pos = {lat: latn, lng: longn}
    var marker = new google.maps.Marker({position: pos, label: body.businesses[i].name, map: map})

    var newRow = table.insertRow(table.length);
    var cell0 = newRow.insertCell(0);
    cell0.innerHTML = body.businesses[i].name;
    var cell1 = newRow.insertCell(1);
    cell1.innerHTML = body.businesses[i].location.address1;
    var cell2 = newRow.insertCell(2);
    cell2.innerHTML = body.businesses[i].rating;

    var cell3 = newRow.insertCell(3);
    if (typeof(body.businesses[i].price) === 'undefined')
    {
      cell3.innerHTML = " ";
    }
    else {
      cell3.innerHTML = body.businesses[i].price;
    }
    var cell4 = newRow.insertCell(4);
    if (typeof(body.businesses[i].phone) === 'undefined')
    {
      cell4.innerHTML = " ";
    }
    else {
      cell4.innerHTML = body.businesses[i].phone;
    }

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
  console.log(cat);
  var search_url = yelp_search_url.replace("LAT",latitude);
  var search_url = search_url.replace("LONG",longitude);
  var search_url = search_url.replace("CAT",cat);
  console.log(search_url);
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
  cat = document.getElementById("inputCat").value;
  if (cat == "")
    cat = "restaurants";
  if (!validcategories.includes(cat)) {
    alert("Enter a valid category");
    return false;
  }

  city = document.getElementById("inputCity").value;
  if (city == "") {
    alert("Enter a location");
    return false;
  };
  document.getElementById("home").style.display="none";
	document.getElementById("new").style.display="block";
  nearByEventsMap();
}

function changeCurr() {
  cat = document.getElementById("inputCat").value;
  if (cat == "")
    cat = "restaurants";
  if (!validcategories.includes(cat)) {
    alert("Enter a valid category");
    return false;
  }
  console.log(cat);

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
  lat.innerHTML = "";
  long.innerHTML = "";
  resetTable();
  currCount = 0;
  initMap();
}
