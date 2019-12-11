import * as d3 from 'd3'
import * as topojson from 'topojson'

const margin = { top: 0, left: 0, right: 300, bottom: 50 }

const height = 600 - margin.top - margin.bottom

const width = 900 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const projection = d3.geoMercator()

const radiusScale = d3
  .scaleSqrt()
  .domain([25, 126])
  .range([0, 40])

// out geoPath needs a PROJECTION variable
const path = d3.geoPath().projection(projection)

Promise.all([
  d3.json(require('/data/Beijing.json')),
  d3.csv(require('/data/region_center_dots.csv'))
])
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready([json, datapoints]) {
  console.log('datapoints are', datapoints)

  const areas2 = topojson.feature(json, json.objects.Beijing2)

  console.log('areas are', areas2.features)

  projection.fitSize([width, height], areas2)

  svg
    .append('g')
    .selectAll('.area2')
    .data(areas2.features)
    .enter()
    .append('path')
    .attr('class', 'area2')
    .attr('d', path)
    .attr('stroke', 'grey')
    .attr('fill', 'none')

  svg
    .append('g')
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', d => radiusScale(d.y15))
    .attr('transform', d => {
      const coords = projection([d.lon, d.lat])
      return `translate(${coords})`
    })
    .attr('stroke', 'grey')
    .attr('fill', 'none')
    .attr('class', 'y15')
    // .attr('fill', d => colorScale(d.PrimSource))
    .attr('opacity', 0)

  svg
    .append('g')
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', d => radiusScale(d.y16))
    .attr('transform', d => {
      const coords = projection([d.lon, d.lat])
      return `translate(${coords})`
    })
    .attr('stroke', 'grey')
    .attr('fill', 'none')
    .attr('class', 'y16')
    // .attr('fill', d => colorScale(d.PrimSource))
    .attr('opacity', 0)

  svg
    .append('g')
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', d => radiusScale(d.y17))
    .attr('transform', d => {
      const coords = projection([d.lon, d.lat])
      return `translate(${coords})`
    })
    .attr('stroke', 'grey')
    .attr('fill', 'none')
    .attr('class', 'y17')
    // .attr('fill', d => colorScale(d.PrimSource))
    .attr('opacity', 0)

  svg
    .append('g')
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', d => radiusScale(d.y18))
    .attr('transform', d => {
      const coords = projection([d.lon, d.lat])
      return `translate(${coords})`
    })
    .attr('stroke', '#fc8d59')
    .attr('stroke-width', 2.5)
    .attr('fill', 'none')
    .attr('class', 'y18')
    .attr('opacity', 0)

  d3.select('#step15')
    .on('stepin', function() {
      svg.selectAll('.y15').attr('opacity', 1)
    })
    .on('stepout', function() {
      svg.selectAll('.y15').attr('opacity', 0)
    })

  d3.select('#step16')
    .on('stepin', function() {
      svg.selectAll('.y16').attr('opacity', 1)
    })
    .on('stepout', function() {
      svg.selectAll('.y16').attr('opacity', 0)
    })

  d3.select('#step17')
    .on('stepin', function() {
      svg.selectAll('.y17').attr('opacity', 1)
    })
    .on('stepout', function() {
      svg.selectAll('.y17').attr('opacity', 0)
    })

  d3.select('#step18')
    .on('stepin', function() {
      svg.selectAll('.y18').attr('opacity', 1)
    })
    .on('stepout', function() {
      svg.selectAll('.y18').attr('opacity', 0)
    })
}
