// Step 1: Initialize the map
var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
).addTo(map);

// Step 2: Fetch earthquake data
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

fetch(queryUrl)
    .then(response => response.json())
    .then(data => createEarthquakeFeatures(data.features));

// Step 3: Marker size based on magnitude
function markerSize(magnitude) {
    return magnitude * 2;
}

// Step 3: Color based on depth
function getColor(depth) {
    return depth > 90 ? 'red' :
           depth > 70 ? 'orangered' :
           depth > 50 ? 'orange' :
           depth > 30 ? 'gold' :
           depth > 10 ? 'yellow' :
                        'green';
}

// Step 4: Create features
function createEarthquakeFeatures(earthquakeData) {
    earthquakeData.forEach(earthquake => {
        var magnitude = earthquake.properties.mag;
        var depth = earthquake.geometry.coordinates[2];
        var lat = earthquake.geometry.coordinates[1];
        var lon = earthquake.geometry.coordinates[0];
        
        L.circleMarker([lat, lon], {
            radius: markerSize(magnitude),
            fillColor: getColor(depth),
            color: "#000",
            weight: 1,
            fillOpacity: 0.8
        }).bindPopup(`<h3>Location: ${earthquake.properties.place}</h3><hr><p>Magnitude: ${magnitude}<br>Depth: ${depth} km<br>Date: ${new Date(earthquake.properties.time)}</p>`)
        .addTo(map);
    });
}

// Step 5: Add a legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        depths = [0, 10, 30, 50, 70, 90];

    div.innerHTML += '<h4>Depth (km)</h4>';

    // Loop through depth intervals and create a label with a color for each interval
    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '; width: 18px; height: 18px; display: inline-block;"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};

// Add the legend to the map
legend.addTo(map);
