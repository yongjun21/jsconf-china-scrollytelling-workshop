import React, {useEffect, useRef} from 'react'
import './DynamicMap.scss'

import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import {Deck} from '@deck.gl/core'
import {TileLayer} from '@deck.gl/geo-layers'
import {VectorTile} from '@mapbox/vector-tile'
import Protobuf from 'pbf'

import {clamp} from '@st-graphics/react-scrolly'

const viewState = {
  latitude: 1.3517474635381912,
  longitude: 103.94508562958512,
  minZoom: 13,
  maxZoom: 17,
  zoom: 14.3,
  bearing: 20,
  pitch: 60
}

function DynamicMap (props) {
  const $base = useRef(null)
  const $deck = useRef(null)
  const deck = useRef(null)
  
  const year = clamp(props.slideIndex, 0, props.slideCount - 1) * 10 + 1970

  useEffect(() => {
    if (deck.current) return deck.current.setProps({layers: getLayers(year)})
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhY2hvcGF6b3MiLCJhIjoiY2pkMDN3eW4wNHkwZDJ5bGc0cnpueGNxbCJ9.WWWg_OnK5e7L1RknMliY4A'
    const map = new mapboxgl.Map({
      container: $base.current,
      style: 'mapbox://styles/chachopazos/cjxemaj7e025i1cmuwcxbndu2',
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch
    })

    map.on('load', () => {
      deck.current = new Deck({
        canvas: $deck.current,
        width: '100%',
        height: '100%',
        viewState,
        initialViewState: viewState,
        layers: getLayers(year)
      })
    })
  }, [year])

  return (
    <div className="dynamic-map">
      <div className="map-container" ref={$base}></div>
      <div className="deck-container"><canvas ref={$deck}></canvas></div>
      <h1 className="year">{year}</h1>
    </div>
  )
}

export default DynamicMap

function getLayers (year) {
  return [
    new TileLayer({
      id: 'static',
      getTileData: ({x, y, z}) => getTile(x, y, z).then(features => features.filter(f => !f.properties.built)),
      extruded: true,
      getFillColor: [255, 255, 255, 255],
      getElevation: f => f.properties.height || 0
    }),
    new TileLayer({
      id: 'dynamic',
      getTileData: ({x, y, z}) => getTile(x, y, z).then(features => features.filter(f => f.properties.built)),
      extruded: true,
      getFillColor: getFill,
      getElevation: getElevation,
      transitions: {
        getElevation: 1000,
        getFillColor: 1000
      },
      updateTriggers: {
        getElevation: [year],
        getFillColor: [year]
      }
    })
  ]

  function getFill (f) {
    const built = f.properties.built
    const opacity = built < year + 10 ? 255 : 0
    if (built < 1970) return [216, 128, 173, opacity]
    if (built < 1980) return [240, 140, 164, opacity]
    if (built < 1990) return [253, 158, 153, opacity]
    if (built < 2000) return [253, 181, 140, opacity]
    if (built < 2010) return [254, 199, 187, opacity]
    if (built < 2020) return [254, 228, 112, opacity]
    return 'none'
  }
  
  function getElevation (f) {
    const built = f.properties.built
    return built < year + 10 ? f.properties.height || 0 : 0
  }
}

const dataCache = {}
function getTile (x, y, z) {
  const key = [z, x, y].join('/')
  if (key in dataCache) return dataCache[key]
  const url = `https://d3a6pnaj5tfasc.cloudfront.net/maps/hdb/${z}/${x}/${y}.pbf`
  dataCache[key] = axios.get(url, {responseType: 'arraybuffer'})
    .then(res => res.data)
    .then(buffer => {
      const tile = new VectorTile(new Protobuf(buffer))
      const layer = tile.layers.buildings
      const features = []
      for (let i = 0; i < layer.length; i++) {
        const feature = layer.feature(i).toGeoJSON(x, y, z)
        if (feature.geometry.type === 'MultiPolygon' && feature.geometry.coordinates.length === 0) continue
        features.push(feature)
      }
      return features
    })
    .catch(() => [])
  return dataCache[key]
}
