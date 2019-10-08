<template>
  <div class="simple-scrolly">
    <div class="sticky-container">
      <div class="sticky-content" :style="stickyStyle"></div>
    </div>

    <div class="slide-container" ref="slides">
      <div class="slide">
        <div class="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
      </div>
      <div class="slide">
        <div class="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
      </div>
      <div class="slide">
        <div class="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollPosition: -1,
      triggerPositions: [-1, -1, -1]
    }
  },
  computed: {
    slideIndex () {
      return this.triggerPositions.filter(pos => pos >= 0).length - 1
    },
    stickyStyle () {
      return {
        backgroundColor: ['red', 'green', 'blue'][this.slideIndex]
      }
    }
  },
  methods: {
    measure () {
      this.scrollPosition = -this.$el.getBoundingClientRect().top
      this.triggerPositions = Array.prototype.map.call(
        this.$refs.slides.children,
        $slide => -$slide.getBoundingClientRect().top
      )
    }
  },
  mounted () {
    this.measure()
    this.measure = frameRateLimited(this.measure)
    window.addEventListener('scroll', this.measure)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.measure)
  },
  watch: {
    slideIndex: console.log
  }
}

function frameRateLimited (cb, context) {
  let ready = true
  function wrapped () {
    if (!ready) return
    ready = false
    window.requestAnimationFrame(() => {
      cb.apply(this, arguments)
      ready = true
    })
  }
  return context ? wrapped.bind(context) : wrapped
}
</script>

<style lang="scss">
.simple-scrolly {
  position: relative;

  .slide {
    height: 1200px;
    padding: 200px 100px;
    box-sizing: border-box;
  }

  .slide + .slide {
    border-top: 3px solid black;
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
    line-height: 1.6em;
    border-radius: 5px;
    box-shadow: 0 0 1px #AAA;
  }

  .sticky-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  .sticky-content {
    background-color: red;
    position: sticky;
    height: 50vh;
    top: 25vh;
  }
}
</style>
