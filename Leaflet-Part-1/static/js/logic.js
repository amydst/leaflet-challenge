// "USGS All Earthquakes, Past Day" url
const quakesUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

// Creating map object:
//  Longitude and latitude for center Kamsar, Guinea; and starting zoom level of 2.
let map = L.map("map", {
    center: [10.60, -14.60],
    zoom: 2
});

//Tile layer with some topographic details
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

//Function that designs all the features of the markers
function createMarkerFeatures(quakeData) {
    var quakeMarkers = [];

    quakeData.forEach(function(feature) {
        var location = feature.properties.place;
        var coords = feature.geometry.coordinates;
        var magnitude = feature.properties.mag;
        var depth = coords[2];

        // Determine the color based on depth
        var color = getColor(depth);

        // Create a circle marker for each earthquake
        var circleMarker = L.circleMarker([coords[1], coords[0]], {
            radius: magnitude ** 2.2, // Scale the size
            fillColor: color,
            color: color,
            weight: 3,
            opacity: 1,
            fillOpacity: 0.75
        }).bindPopup('Location: ' + location +  '<br>Magnitude: ' + magnitude + '<br>Depth: ' + depth + ' km');

        quakeMarkers.push(circleMarker); // Add the circle marker to the array
    });

    // Add all circle markers to the map
    L.layerGroup(quakeMarkers).addTo(map);

    // Create a legend control
    var legend = L.control({position: 'bottomright'});

    //Design the actual legend box

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            depths = [0, 15, 30, 60, 90, 120, 150];
                
        div.innerHTML = '<strong>Depth in km</strong><br>';

        // Loop through depth intervals and generate a label with a colored square
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></i> ' + // Colored square
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        // Add the background styling for the legend container
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';

        return div;
    };

    legend.addTo(map);
}

// Function to return color based on depth
function getColor(depth) {
    return depth > 150 ? 'darkred' :
           depth > 120 ? 'crimson' :
           depth > 90 ? 'mediumvioletred' :
           depth > 60 ? 'orchid' :
           depth > 30 ? 'plum' :
           depth > 15 ? 'pink' : 'mistyrose';
}

//Putting everything togeter to create the map and display all the eartquakes that have happened in the past day

d3.json(quakesUrl)
    .then(function(data) {
        createMarkerFeatures(data.features);
    }
);


