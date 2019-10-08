<template>
  <div class="dynamic-map">
    <div class="map-container" ref="base"></div>
    <h1 class="rank">排名第 {{currentSlide.rank}}</h1>
  </div>
</template>

<script>
import setupMap from '../services/setupMap'

export default {
  props: ['slideIndex', 'enter', 'progress', 'slides'],
  computed: {
    currentSlide () {
      return this.slides[this.slideIndex]
    },
    progressLastSlide () {
      return this.progress.at(this.slides.length)(true)
    }
  },
  mounted () {
    const {slides} = this

    setupMap(this.$refs.base, map => {
      const features = map.querySourceFeatures('osmbuildings', {sourceLayer: 'building'})
      const featureStateSetters = slides.map(row => {
        const filtered = features.filter(row.filter)
        return state => filtered.forEach(f => {
          map.setFeatureState({
            source: 'osmbuildings',
            sourceLayer: 'building',
            id: f.id
          }, state)
        })
      })

      this.$watch('slideIndex', index => {
        featureStateSetters.forEach((setter, i) => {
          const highlighted = i === index
          setter({highlighted})
        })
      }, {immediate: true})

      this.$watch('enter', enter => {
        featureStateSetters.forEach((setter, i) => {
          const factor = Math.max(enter(i, 300, 0), 1 - enter(i, 30, -300))
          setter({factor})
        })
      }, {immediate: true})

      this.$watch('progressLastSlide', t => {
        const b = (1 - t) * 190 + t * 60
        map.setBearing(b)
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
