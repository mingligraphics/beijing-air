let _map = null
const _centerLat = 40
const _centerLng = 116.5
const _dataFile = require('/data/detector_dots.geojson')
const _accessToken =
  'pk.eyJ1IjoieGlhb2xlaWFvIiwiYSI6ImNqdzc4YTltNzJic3c0OHFxeWhlZDVodGkifQ.fq-KOXgjoJwsGRBsfqmy6w'
const _mapStyle = 'mapbox://styles/mapbox/light-v10'

mapboxgl.accessToken = _accessToken
_map = new mapboxgl.Map({
  container: 'map',
  style: _mapStyle,
  center: [_centerLng, _centerLat],
  zoom: 7.9
})

function init() {
  _map.addSource('markers-source', {
    type: 'geojson',
    data: _dataFile
  })

  _map.addLayer({
    id: 'markers',
    type: 'circle',
    source: 'markers-source',
    paint: {
      'circle-color': 'orange',
      'circle-radius': 4,
      'circle-stroke-width': 0
    }
  })

  _map.on('click', function(e) {
    const features = _map.queryRenderedFeatures(e.point, {
      layers: ['markers']
    })
    if (!features.length) {
      return
    }
    const feature = features[0]
    const popup = new mapboxgl.Popup()
      .setLngLat(_map.unproject(e.point))
      .setHTML(
        '<ul>' +
          '<img src="' +
          feature.properties.image +
          '">' +
          '<li>Sale price: <b>' +
          feature.properties.AdjustedSa +
          '</b></li>' +
          '<li>Address: <b>' +
          feature.properties.Address +
          '</b></li>' +
          '<li>Property type: <b>' +
          feature.properties.PropType +
          '</b></li>' +
          '</ul>'
      )
      .addTo(_map)
  })
}

// "<h3>HOME SALES INFORMATION</h3>" +

_map.once('style.load', function(e) {
  init()
  _map.addControl(new mapboxgl.NavigationControl())
})
