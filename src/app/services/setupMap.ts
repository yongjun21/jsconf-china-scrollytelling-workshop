import {Map} from 'mapbox-gl'

export default function ($el: Element, cb: (map: Map) => void) {
  const map = new Map({
    container: $el,
    style: '/assets/mapbox-gl/style.json',
    center: [121.495, 31.240],
    minZoom: 15,
    maxZoom: 15,
    zoom: 15,
    bearing: 190,
    pitch: 60,
    interactive: false,
    transformRequest: url => {
      const transformed = url.replace(
        'https://mapbox-gl/',
        window.location.origin + '/assets/mapbox-gl/'
      )
      return {url: transformed}
    }
  })

  map.on('load', () => {
    map.addLayer({
      'id': '3d-buildings',
      'source': 'osmbuildings',
      'source-layer': 'building',
      'type': 'fill-extrusion',
      'paint': {
        'fill-extrusion-color': [
          'case',
          ['boolean', ['feature-state', 'highlighted'], false],
          '#f00',
          '#aaa'
        ],
        'fill-extrusion-height': [
          'case',
          ['has', 'height'],
          [
            '*',
            ['get', 'height'],
            ['number', ['feature-state', 'factor'], 1]
          ],
          [
            '*',
            ['number', ['get', 'levels'], 1],
            ['number', ['feature-state', 'factor'], 1],
            3
          ]
        ],
        'fill-extrusion-base': [
          'case',
          ['has', 'minHeight'],
          [
            '*',
            ['get', 'minHeight'],
            ['number', ['feature-state', 'factor'], 1]
          ],
          [
            '*',
            ['number', ['get', 'minLevel'], 0],
            ['number', ['feature-state', 'factor'], 1],
            3
          ]
        ],
        'fill-extrusion-opacity': 0.6
      }
    }, 'place-other')

    cb(map)
  })

  return map
}
