<template>
  <div class="dynamic-map">
    <div class="map-container" ref="base"></div>
    <div class="deck-container"><canvas ref="deck"></canvas></div>
    <h1 class="year">{{year}}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import {Deck} from '@deck.gl/core'
import {TileLayer} from '@deck.gl/geo-layers'
import {VectorTile} from '@mapbox/vector-tile'
import Protobuf from 'pbf'

import {clamp} from './StScrolly.vue'

const viewState = {
  latitude: 1.3517474635381912,
  longitude: 103.94508562958512,
  minZoom: 13,
  maxZoom: 17,
  zoom: 14.3,
  bearing: 20,
  pitch: 60
}

export default {
  props: ['slideIndex', 'slideCount'],
  computed: {
    year () {
      return clamp(this.slideIndex, 0, this.slideCount - 1) * 10 + 1970
    }
  },
  methods: {
    getFill (f) {
      const built = f.properties.built
      const opacity = built < this.year + 10 ? 255 : 0
      if (built < 1970) return [216, 128, 173, opacity]
      if (built < 1980) return [240, 140, 164, opacity]
      if (built < 1990) return [253, 158, 153, opacity]
      if (built < 2000) return [253, 181, 140, opacity]
      if (built < 2010) return [254, 199, 187, opacity]
      if (built < 2020) return [254, 228, 112, opacity]
      return 'none'
    },
    getElevation (f) {
      const built = f.properties.built
      return built < this.year + 10 ? f.properties.height || 0 : 0
    },
    getLayers () {
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
          getFillColor: this.getFill,
          getElevation: this.getElevation,
          transitions: {
            getElevation: 1000,
            getFillColor: 1000
          },
          updateTriggers: {
            getElevation: [this.year],
            getFillColor: [this.year]
          }
        })
      ]
    }
  },
  mounted () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhY2hvcGF6b3MiLCJhIjoiY2pkMDN3eW4wNHkwZDJ5bGc0cnpueGNxbCJ9.WWWg_OnK5e7L1RknMliY4A'
    const map = new mapboxgl.Map({
      container: this.$refs.base,
      style: 'mapbox://styles/chachopazos/cjxemaj7e025i1cmuwcxbndu2',
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      bearing: viewState.bearing,
      pitch: viewState.pitch
    })

    map.on('load', () => {
      const deck = new Deck({
        canvas: this.$refs.deck,
        width: '100%',
        height: '100%',
        viewState,
        initialViewState: viewState,
        // onViewStateChange ({viewState}) {
        //   map.jumpTo({
        //     center: [viewState.longitude, viewState.latitude],
        //     zoom: viewState.zoom,
        //     bearing: viewState.bearing,
        //     pitch: viewState.pitch
        //   })
        // },
        // controller: true,
        layers: this.getLayers()
      })

      this.$watch('year', () => {
        deck.setProps({layers: this.getLayers()})
      })
    })
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
</script>

<style lang="scss">
.dynamic-map {
  width: 100%;
  height: 100%;

  .map-container,
  .deck-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  canvas {
    left: 0;
    top: 0;
  }

  h1 {
    margin: 0;
    padding: 20px;
    text-align: right;
    color: white;
    font-size: 3rem;
    text-shadow: 0 0 2px black;
    position: relative;
  }

  input[type="range"] {
    display: block;
    position: absolute;
    bottom: 0;
    padding: 30px 0;
    margin: 0;
    width: 100%;
    z-index: 1;
    box-sizing: border-box;
  }

  .mapboxgl-control-container {
    display: none;
  }
}
</style>
