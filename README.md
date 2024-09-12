# leaflet-challenge

This project visualizes earthquake data from the USGS in real-time using the Leaflet library. The earthquake markers are plotted on a map based on their latitude and longitude, with the marker size reflecting the earthquake's magnitude and the color representing the earthquake's depth.

## Features

- **Earthquake Map**: Displays earthquake locations using markers sized by magnitude and colored by depth.
- **Interactive Popups**: Each marker has a popup showing information about the earthquake (location, magnitude, depth, date).
- **Legend**: The map includes a legend that explains the depth color coding.


## Technologies Used

- **Leaflet**: JavaScript library for interactive maps.
- **GeoJSON**: Earthquake data in GeoJSON format fetched from the USGS API.
- **HTML/CSS/JavaScript**: The structure and functionality of the project.

## Earthquake Data Source

The earthquake data is fetched from the USGS Earthquake Catalog API in GeoJSON format:
- Example API URL: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson`

