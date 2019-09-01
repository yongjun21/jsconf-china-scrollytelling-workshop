<template>
  <st-scrolly class="my-story" :triggerOffset="-300">
    <template v-slot:background="{slideIndex, enter}">
      <dynamic-map
        :slide-index="clamp(slideIndex, 0, slides.length - 1)"
        :enter="enter"
        :slides="slides">
      </dynamic-map>
    </template>

    <template v-slot="{enter}">
      <div class="slide" v-for="(slide, i) in slides" :key="slide.rank" :style="{opacity: enter(i, 400)}">
        <p class="card">{{slide.name_chi}} ({{slide.year}})<br>{{slide.height}} m</p>
      </div>
    </template>
  </st-scrolly>
</template>

<script>
import '@st-graphics/scrolly/dist/bundle.css'

import StScrolly, {clamp} from '@st-graphics/scrolly'
import DynamicMap from './DynamicMap.vue'

import {tallest} from '../data'

export default {
  components: {StScrolly, DynamicMap},
  data () {
    return {
      // Using Object.freeze as data is static
      slides: Object.freeze(tallest.reverse())
    }
  },
  methods: {
    clamp
  }
}
</script>

<style lang="scss">
.my-story {
  .slide {
    height: 1200px;
    padding: 200px 100px;
  }

  .card {
    display: inline-block;
    width: 250px;
    margin: 0;
    float: right;
    padding: 1em;
    background-color: white;
    text-align: left;
    font-size: 1.2em;
    font-weight: 500;
    line-height: 2.4em;
    border-radius: 5px;
    box-shadow: 0 0 1px #AAA;
  }
}
</style>
