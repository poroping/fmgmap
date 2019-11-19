var map = L.map('fortimap');

var realtime = L.realtime({
      url: '/devices',
      crossorigin: true,
      type: 'json'
    }, {
      interval: 10 * 1000,
      pointToLayer: function (feature, latlng) {
        marker = L.marker(latlng, {'icon': greyIcon});
        marker.bindPopup(feature.properties.id);
        marker.bindTooltip(feature.properties.id);
        return marker;
      }
    }).addTo(map);

var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
map.addLayer(layer);

var greyIcon = new L.Icon({
  iconUrl: '/static/img/marker-icon-grey.png',
  shadowUrl: '/static/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
  iconUrl: '/static/img/marker-icon-green.png',
  shadowUrl: '/static/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
  iconUrl: '/static/img/marker-icon-yellow.png',
  shadowUrl: '/static/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: '/static/img/marker-icon-red.png',
  shadowUrl: '/static/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

realtime.once('update', function() {
  map.fitBounds(realtime.getBounds().pad(0.5));
});

realtime.on('update', function(e) {
  updateFeatureIcon = function (fId) {
    var feature = e.features[fId],
    status = feature.properties.status;
    if (status == 'online') {
      realtime.getLayer(fId).setIcon(greenIcon);
    }
    if (status == 'offline') {
      realtime.getLayer(fId).setIcon(redIcon);
    }
    if (status == 'unknown') {
      realtime.getLayer(fId).setIcon(greyIcon);
    }
  };

  Object.keys(e.update).forEach(updateFeatureIcon); });
