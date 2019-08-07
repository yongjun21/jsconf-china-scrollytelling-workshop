<template>
  <st-scrolly class="my-story" :triggerOffset="-100">
    <template v-slot:background="{slideIndex, slideCount}">
      <dynamic-map :slide-index="slideIndex" :slide-count="slideCount"></dynamic-map>
    </template>

    <template v-slot="{enter}">
      <div class="slide" v-for="(p, i) in slideContent" :key="i" :style="{opacity: enter(i, 400)}">
        <p class="card">{{p}}</p>
      </div>
    </template>
  </st-scrolly>
</template>

<script>
import '@st-graphics/scrolly/dist/bundle.css'

import StScrolly from '@st-graphics/scrolly'
import DynamicMap from './DynamicMap.vue'

export default {
  components: {StScrolly, DynamicMap},
  data () {
    return {
      slideContent: [
        '滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。',
        '白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。',
        '是非成败转头空，青山依旧在，惯看秋月春风。',
        '一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。',
        '几度夕阳红。白发渔樵江渚上，都付笑谈中.......'
      ]
    }
  }
}
</script>

<style lang="scss">
.my-story {
  .slide {
    height: 1200px;
    padding: 200px 150px;
  }

  .card {
    display: inline-block;
    width: 300px;
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
