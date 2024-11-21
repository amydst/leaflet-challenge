

// // "USGS All Earthquakes, Past Hour" url
// const quakesUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

// // Creating map object:
// // Longitude, latitude, and starting zoom level.
// let map = L.map("map", {
//     center: [10.60, -14.60],
//     zoom: 2
// });

// L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
// }).addTo(map);

// function markerSize(magnitude) {
//     return (magnitude) * 100;
// }

// function createMarkers(response) {
//     var quake = response.features;
//     var quakeMarkers = [];

//     for (var index = 0; index < quake.length; index++) {
//         var earthquake = quake[index];

//         // Create a marker with the correct coordinates
//         var marker = L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]])
//             .bindPopup("<h3>" + earthquake.properties.place + "<br>Magnitude: " + earthquake.properties.mag + "</h3>");

//         quakeMarkers.push(marker);
//     }
//     createMap(L.layerGroup(quakeMarkers));
// }

// d3.json(quakesUrl)
//     .then(function(data) {
//         createFeatures(data.features); // Call createFeatures with the fetched data
//         createMarkers(data); // Call createMarkers with the fetched data
//     });

// function createFeatures(quakeData) {
//     var quakeMarkers = []; // Create an array to hold the circle markers

//     quakeData.forEach(function(feature) {
//         var location = feature.properties.place;
//         var coords = feature.geometry.coordinates;
//         var magnitude = feature.properties.mag;
//         var depth = coords[2];

//         // Determine the color based on depth
//         var color = depth > 150 ? 'darkred' : depth > 120 ? 'crimson' : depth > 90 ? 'mediumvioletred' : depth > 60 ? 'orchid' : depth > 30 ? 'plum': depth > 15 ? 'pink':'mistyrose';

//         // Create a circle marker for each earthquake
//         var circleMarker = L.circleMarker([coords[1], coords[0]], {
//             radius: magnitude ** 2, // Scale the size
//             fillColor: color,
//             color: color,
//             weight: 3,
//             opacity: 1,
//             fillOpacity: 0.75
//         }).bindPopup('Location: ' + location +  '<br>Magnitude: ' + magnitude + '<br>Depth: ' + depth + ' km');

//         quakeMarkers.push(circleMarker); // Add the circle marker to the array
//     });

//     // Add all circle markers to the map
//     L.layerGroup(quakeMarkers).addTo(map);

//     // Create a legend control
//     var legend = L.control({position: 'bottomright'});

//     legend.onAdd = function (map) {
//       var div = L.DomUtil.create('div', 'info legend'),
//           depths = [0, 15, 30, 60, 90, 120, 150], // Define depth intervals
//           labels = [];

//       // Loop through depth intervals and generate a label with a colored square
//       for (var i = 0; i < depths.length; i++) {
//           div.innerHTML +=
//               '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' + // Use +1 to ensure the color reflects the next range
//               depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
//       }

//       return div;
//   };

//   // Add the legend to the map
//   legend.addTo(myMap);

// }
// // "USGS All Earthquakes, Past Hour" url

// url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'

// d3.json(url).then(function(inforRes){

// }
// )

// "USGS All Earthquakes, Past Hour" url
const quakesUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

// Creating map object:
// Longitude, latitude, and starting zoom level.
let map = L.map("map", {
    center: [10.60, -14.60],
    zoom: 2
});

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

function markerSize(magnitude) {
    return (magnitude) * 100;
}

function createMarkers(response) {
    var quake = response.features;
    var quakeMarkers = [];

    for (var index = 0; index < quake.length; index++) {
        var earthquake = quake[index];

        // Create a marker with the correct coordinates
        var marker = L.marker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]])
            .bindPopup("<h3>" + earthquake.properties.place + "<br>Magnitude: " + earthquake.properties.mag + "</h3>");

        quakeMarkers.push(marker);
    }
    createMap(L.layerGroup(quakeMarkers));
}

d3.json(quakesUrl)
    .then(function(data) {
        createFeatures(data.features); // Call createFeatures with the fetched data
        createMarkers(data); // Call createMarkers with the fetched data
    });

function createFeatures(quakeData) {
    var quakeMarkers = []; // Create an array to hold the circle markers

    quakeData.forEach(function(feature) {
        var location = feature.properties.place;
        var coords = feature.geometry.coordinates;
        var magnitude = feature.properties.mag;
        var depth = coords[2];

        // Determine the color based on depth
        var color = getColor(depth); // Use the getColor function to get the correct color for the legend

        // Create a circle marker for each earthquake
        var circleMarker = L.circleMarker([coords[1], coords[0]], {
            radius: magnitude ** 2, // Scale the size
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

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            depths = [0, 15, 30, 60, 90, 120, 150], // Define depth intervals
            labels = [];
        
        
        div.innerHTML = '<strong>Depth in km</strong><br>'; // Add title with bold text
        // Loop through depth intervals and generate a label with a colored square
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></i> ' + // Colored square
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        // Add the background styling for the legend container
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // Semi-transparent white background
        div.style.padding = '10px'; // Padding inside the box
        div.style.borderRadius = '5px'; // Rounded corners
        div.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)'; // Shadow for better visibility

        return div;
    };

    // Add the legend to the map
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



