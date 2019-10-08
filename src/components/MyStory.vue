<template>
  <st-scrolly class="my-story">
    <template v-slot:background="{slideIndex, enter, progress}">
      <dynamic-map
        :slide-index="slideIndex"
        :enter="enter"
        :progress="progress"
        :features="features">
      </dynamic-map>
    </template>

    <div class="slide" v-for="f in features" :key="f.rank">
      <p class="card">
        {{f.name_chi}} ({{f.year}})<br>{{f.height}} m
      </p>
    </div>
  </st-scrolly>
</template>

<script>
import '@st-graphics/scrolly/dist/bundle.css'

import StScrolly from '@st-graphics/scrolly'
import DynamicMap from './DynamicMap.vue'

import {features} from '../data'

export default {
  components: {StScrolly, DynamicMap},
  data () {
    return {
      // Using Object.freeze as data is static
      features: Object.freeze(features.reverse())
    }
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
