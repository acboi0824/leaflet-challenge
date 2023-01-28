// Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Determine sizes for each markers on the map
function size(magnitude) {
  return magnitude * 20000;
}

// Loop thru features and create marker for each mag object
function colors(magnitude) {
  var color = "";
  if (magnitude >= 5) {
    return "rgb(240, 107, 107)" ;
  }
  else if (magnitude >4) {
    return "rgb(240, 167, 107)";
  }
  else if (magnitude >3) {
    return "rgb(243, 186, 77)";
  }
  else if (magnitude >2) {
    return "rgb(243, 219, 77)";
  }
  else if (magnitude >1) {
    return "rgb(226, 243, 77)";
  }
  else  {
    return "rgb(183, 243, 77)";
  }

}

// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {

  console.log(data.features);

  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);

});

function createFeatures(earthquakeData) {

  // Check on coordinates and magnitude data 
  console.log(earthquakeData[0].geometry.coordinates[1]);
  console.log(earthquakeData[0].geometry.coordinates[0]);
  console.log(earthquakeData[0].properties.mag);

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "<hr> <p> Earthquake Magnitude: " + feature.properties.mag + "</p>")
  }

  var earthquakes = L.geoJSON(earthquakeData, {

    onEachFeature: onEachFeature,

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    pointToLayer: function (feature, coordinates) {
      // Determine Marker Colors, Size, and Opacity for each earthquake.
      var geoMarkers = {
        radius: size(feature.properties.mag),
        fillColor: colors(feature.properties.mag),
        fillOpacity: 0.30,
        stroke: true,
        weight: 1
      }
      return L.circle(coordinates, geoMarkers);
    }
  })

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

// Create function for earthquake map
function createMap(earthquakes) {

  // Define streetmap layer
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,

  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };


  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var colors = [
          "rgb(183, 243, 77)",
          "rgb(226, 243, 77)",
          "rgb(243, 219, 77)",
          "rgb(243, 186, 77)",
          "rgb(240, 167, 107)",
          "rgb(240, 107, 107)"];
      var labels = [];

      var legendInfo = "<h1>Earthquake intensity<h1>" + 
          "<div class=\"labels\">" +
              "<div class=\"max\">5+</div>" +
              "<div class=\"fourth\">4-5</div>" +
              "<div class=\"third\">3-4</div>" +
              "<div class=\"second\">2-3</div>" +
              "<div class=\"first\">1-2</div>" +
              "<div class=\"min\">0-1</div>" +
          "</div>";

      div.innerHTML = legendInfo;

      colors.forEach(function(color) {
          labels.push("<li style=\"background-color: " + color + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
  };
  

  // Add the info legend to the map.
  legend.addTo(myMap);

}