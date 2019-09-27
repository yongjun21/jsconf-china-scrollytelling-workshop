<template>
  <div class="dynamic-map">
    <div class="map-container" ref="base"></div>
    <h1 class="rank">排名第 {{currentSlide.rank}}</h1>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  props: ['slideIndex', 'enter', 'slides'],
  computed: {
    currentSlide () {
      return this.slides[this.slideIndex]
    }
  },
  mounted () {
    const {slides} = this

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhY2hvcGF6b3MiLCJhIjoiY2pkMDN3eW4wNHkwZDJ5bGc0cnpueGNxbCJ9.WWWg_OnK5e7L1RknMliY4A'
    const map = new mapboxgl.Map({
      container: this.$refs.base,
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
      const matchedFeatures = slides.map(row => features.filter(row.filter))

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

      this.$watch('slideIndex', index => {
        matchedFeatures.forEach((features, i) => {
          const highlighted = i === index
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
      }, {immediate: true})

      this.$watch('enter', enter => {
        matchedFeatures.forEach((features, i) => {
          const factor = Math.max(enter(i, 300, 0), 1 - enter(i, 30, -300))
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
      }, {immediate: true})
    })
  }
}
</script>

<style lang="scss">
.dynamic-map {
  width: 100%;
  height: 100%;

  .map-container {
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
    padding: 30px 100px;
    text-align: right;
    color: #EEEEEE;
    font-size: 3rem;
    text-shadow: 0 0 2px black, 1px 2px 2px black;
    position: relative;
  }

  .mapboxgl-control-container {
    display: none;
  }
}
</style>
