<template>
  <div class="dynamic-map">
    <div class="map-container" ref="base"></div>
    <h1 class="rank">排名第 {{'XXX'}}</h1>
  </div>
</template>

<script>
import setupMap from '../services/setupMap'

export default {
  props: ['slideIndex', 'enter', 'progress', 'features'],
  mounted () {
    const {features} = this

    setupMap(this.$refs.base, map => {
      const mapFeatures = map.querySourceFeatures('osmbuildings', {sourceLayer: 'building'})
      const featureStateSetters = features.map(row => {
        const filtered = mapFeatures.filter(row.filter)
        return state => filtered.forEach(f => {
          map.setFeatureState({
            source: 'osmbuildings',
            sourceLayer: 'building',
            id: f.id
          }, state)
        })
      })

      // Example usage
      featureStateSetters[0]({highlighted: true})

      // HINT: https://st-scrolly.netlify.com/guide/#using-slideindex-from-slot-scope

      // HINT: https://st-scrolly.netlify.com/guide/#using-enter-exit-from-slot-scope

      // HINT: https://st-scrolly.netlify.com/guide/#using-progress-from-slot-scope
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
