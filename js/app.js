// initialize the map
var map = L.map('largemap').setView([36.854759,-76.240463], 12);
L.tileLayer(
  'http://{s}.sm.mapstack.stamen.com/(toner,$fff[@60],$178282[hsl-color])/{z}/{x}/{y}.png', {
    maxZoom: 16,
    minZoom: 12 ,
  }).addTo(map);

var url = "mermaid.geojson";

map.scrollWheelZoom.disable();

 // load GeoJSON from an external file
$.getJSON(url, function(data) {
  var ratIcon = L.icon({
    iconUrl: 'mermaid-icon.png',
    iconSize: [28, 28],
    popupAnchor: [0, -18]
  });
  console.log(data);
  // add GeoJSON layer to the map once the file is loaded
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      var marker = L.marker(latlng, {
        icon: ratIcon
      });
      console.log(feature);
      marker.bindPopup('<b>' + '<font size="3">' + feature.properties.name + '</font>' + '</b>' + '<br/>' + feature.properties.address);
           marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
      marker.on('click', function () {
        $('#infowindow').html('<div id="moreinfo-container">' +
        '<img id ="bluedot" src="images/blue-dot.png" alt="mermaid" onClick="closeDiv()"/>'+
          '<div id="moreinfo"> ' +
            '<img src="images/thumb.png" alt="mermaid"/>' +
            '<div class="info">' +
              '<h3 class="title">' + feature.properties.name + '</h3>' +
              '<h3 class="artist-name">'+ feature.properties.artist +'</h3>' +
              '<h3 class="sponsor-label">Sponsor:</h3>' +
              '<h3 class="sponsor-name">'+ feature.properties.sponsor+ '</h3>'+
            '</div>' +
            '<div id="address-container">' +
              '<h3 class="address">'+ feature.properties.address+ '</h3>'+            '<input id="directionbutton" type="submit" value="Directions" />'+
              '</div>' +
           '</div><!--/moreinfo-->' +
         '</div><!--/moreinfo-container-->'
         );
        console.log("showing",  feature.properties.name);
      });

      return marker;
    }
  }).addTo(map);
});

function closeDiv(argument) {
    $('#moreinfo-container').remove();
}
