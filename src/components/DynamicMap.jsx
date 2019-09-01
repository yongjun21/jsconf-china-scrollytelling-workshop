import React, {useState, useEffect, useRef} from 'react'
import './DynamicMap.scss'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

function DynamicMap (props) {
  const $base = useRef(null)
  const mapRef = useRef(null)
  const [matchedFeatures, setMatchedFeatures] = useState(null)
  
  const {slides, slideIndex, enter} = props
  const currentSlide = slides[slideIndex]
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhY2hvcGF6b3MiLCJhIjoiY2pkMDN3eW4wNHkwZDJ5bGc0cnpueGNxbCJ9.WWWg_OnK5e7L1RknMliY4A'
    const map = mapRef.current = new mapboxgl.Map({
      container: $base.current,
      style: '/mapbox-gl/style.json',
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
          window.location.origin + '/mapbox-gl/'
        )
        return {url: transformed}
      }
    })

    map.on('load', () => {
      const features = map.querySourceFeatures('osmbuildings', {sourceLayer: 'building'})
      setMatchedFeatures(slides.map(row => features.filter(row.filter)))

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
    })
  }, [slides])

  useEffect(() => {
    if (!matchedFeatures) return
    const map = mapRef.current
    matchedFeatures.forEach((features, i) => {
      const highlighted = i === slideIndex
      features.forEach(f => {
        map.setFeatureState({
          source: 'osmbuildings',
          sourceLayer: 'building',
          id: f.id
        }, {
          highlighted
        })
      })
    })
  }, [matchedFeatures, slideIndex])

  useEffect(() => {
    if (!matchedFeatures) return
    const map = mapRef.current
    matchedFeatures.forEach((features, i) => {
      const factor = Math.max(enter(i, 300, 0), enter(i, -30, -330))
      features.forEach(f => {
        map.setFeatureState({
          source: 'osmbuildings',
          sourceLayer: 'building',
          id: f.id
        }, {
          factor
        })
      })
    })
  }, [matchedFeatures, enter])

  return (
    <div className="dynamic-map">
      <div className="map-container" ref={$base}></div>
      <h1 className="rank">排名第 {currentSlide.rank}</h1>
    </div>
  )
}

export default DynamicMap
