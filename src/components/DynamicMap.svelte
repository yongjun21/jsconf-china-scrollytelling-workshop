<div class="dynamic-map">
  <div class="map-container" bind:this={baseRef}></div>
  <h1 class="rank">排名第 {currentSlide.rank}</h1>
</div>

<script>
import {onMount} from 'svelte'
import setupMap from '../services/setupMap'

export let slideIndex
export let enter
export let progress
export let slides

let baseRef
let map
let featureStateSetters

$: currentSlide = slides[slideIndex]

$: if (featureStateSetters) {
  featureStateSetters.forEach((setter, i) => {
    const highlighted = i === slideIndex
    setter({highlighted})
  })
}

$: if (featureStateSetters) {
  featureStateSetters.forEach((setter, i) => {
    const factor = Math.max(enter(i, 300, 0), 1 - enter(i, 30, -300))
    setter({factor})
  })
}

$: if (featureStateSetters) {
  const t = progress.at(slides.length)(true)
  const b = (1 - t) * 190 + t * 60
  map.setBearing(b)
}

onMount(() => {
  map = setupMap(baseRef, map => {
    const features = map.querySourceFeatures('osmbuildings', {sourceLayer: 'building'})
    featureStateSetters = slides.map(row => {
      const filtered = features.filter(row.filter)
      return state => filtered.forEach(f => {
        map.setFeatureState({
          source: 'osmbuildings',
          sourceLayer: 'building',
          id: f.id
        }, state)
      })
    })
  })

  setTimeout(() => map.resize(), 100)
})
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
