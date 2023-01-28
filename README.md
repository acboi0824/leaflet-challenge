# Leaflet-Challenge
## Finished Product and link
[https://acboi0824.github.io/leaflet-challenge/](https://acboi0824.github.io/leaflet-challenge/)

# Earthquake Data Web Visualization
## Background
The US Geological Survey (USGS) is in charge of providing scientific data about natural hazards, resource availability, ecosystem health, and impacts of climate and land-use change. USGS scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. One of such resources is their [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), which provides comprehensive data sets related to geological hazards and phenomena. This feed contains the historic earthquake data, which can be a useful tool to map earthquake locations and details using tools such as Leaflet. This project aims to showcase global earthquake data from the last seven days in a world map visualization and is divided into two tasks:<br>
## Step 1: Basic Visualization
This map shows the earthquakes' magnitude and location over a single-layer map. The visualizations are generated using the Leaflet library for Javascript in the `static/js/logic.js` file and called into the DOM in the `index.html` file. This visualization is displayed over a single, plain layer using circles whose color and size vary according to the recorded earthquake's magnitude. In addition, this interactive map allows for the user to view additional details using the map's tooltips as shown in the figure below.

![map](https://github.com/acboi0824/belly-button-challenge/blob/main/Images/table.PNG)
