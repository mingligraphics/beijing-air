import * as d3 from 'd3'

let _map = null
const _centerLat = 40
const _centerLng = 116.5
const _dataFile = require('/data/detector_dots.geojson')
const _accessToken =
  'pk.eyJ1IjoieGlhb2xlaWFvIiwiYSI6ImNqdzc4YTltNzJic3c0OHFxeWhlZDVodGkifQ.fq-KOXgjoJwsGRBsfqmy6w'
const _mapStyle = 'mapbox://styles/mapbox/light-v10'

const detector = d3.select('.detector')

const numbers = d3.range(4)

const barChart = detector
  .selectAll('.group')
  .data(numbers)
  .enter()
  .append('div')
  .attr('class', 'group')
  .style('background-color', '#CCCCCC')

console.log('barchart is', barChart._groups)

// d3.csv(require('../data/BJ_detector_v2.csv'))
//   .then(ready)
//   .catch(err => console.log('Failed on', err))

// function ready(datapoints) {
//   console.log('The data is', datapoints)
//   const group = detector
//     .selectAll('.group')
//     .data(datapoints)
//     .enter()
//     .append('div')
//     .attr('width', 60)
//     .attr('height', d => d.y15)
//     .attr('class', 'group')
//   console.log('The group', group)
// }

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

  let popup = null

  _map.on('mouseenter', 'markers', function(e) {
    const features = _map.queryRenderedFeatures(e.point, {
      layers: ['markers']
    })
    if (!features.length) {
      return
    }
    const feature = features[0]
    popup = new mapboxgl.Popup()
      .setLngLat(_map.unproject(e.point))
      .setHTML(
        barChart._groups +
          '<ul>' +
          '<img src="' +
          '">' +
          '<li>Sale price: <b>' +
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

  _map.on('mouseleave', 'markers', function() {
    _map.getCanvas().style.cursor = ''
    popup.remove()
  })
}

// "<h3>HOME SALES INFORMATION</h3>" +

_map.once('style.load', function(e) {
  init()
  _map.addControl(new mapboxgl.NavigationControl())
})
