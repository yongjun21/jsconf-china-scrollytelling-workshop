<template>
  <div class="st-video-scrolly">
    <object-fit-video
      ref="video"
      v-bind="$attrs"
      muted
      autoplay
      preload="auto"
      webkit-playsinline
      playsinline
      v-on="$listeners">
      <slot></slot>
    </object-fit-video>
    <slot name="artefacts" v-bind="{actualFrame, targetFrame, duration}"></slot>
  </div>
</template>

<script>
import ObjectFitVideo from './ObjectFitVideo.vue'

export default {
  components: {ObjectFitVideo},
  inheritAttrs: false,
  props: {
    progress: {
      type: Number,
      required: true
    },
    framerate: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      duration: 0,
      actualFrame: 0
    }
  },
  computed: {
    targetFrame () {
      return Math.floor(this.progress * this.duration * this.framerate)
    },
    playbackRate () {
      return Math.min(Math.max(this.targetFrame - this.actualFrame, -4), 4)
    }
  },
  mounted () {
    const $video = this.$refs.video.$el

    let rewinding = false
    $video.rewind = function (until, rate = 1) {
      if (rewinding) return
      rewinding = true
      const t0 = Date.now()
      const v0 = $video.currentTime
      window.requestAnimationFrame(function reverse () {
        const targetTime = until()
        const t1 = Date.now()
        const v1 = $video.currentTime
        if (v1 <= targetTime) {
          rewinding = false
          return
        }
        if (!$video.seeking) {
          $video.currentTime = Math.max(v0 - rate * (t1 - t0) / 1000, targetTime)
        }
        window.requestAnimationFrame(reverse)
      })
    }

    $video.addEventListener('loadeddata', e => {
      this.duration = $video.duration
      pollActualFrame.call(this)
      this.$watch('playbackRate', playbackRate => {
        if (playbackRate <= -4 && this.progress <= 0) {
          $video.currentTime = 0
          return
        }
        if (playbackRate >= 4 && this.progress >= 1) {
          $video.currentTime = this.duration
          return
        }

        if (playbackRate > 0) {
          $video.playbackRate = playbackRate
          if ($video.paused) $video.play()
        } else {
          $video.pause()
          if (playbackRate < -1) {
            if (!$video.rewinding) {
              $video.rewind(() => this.targetFrame / this.framerate, -playbackRate)
            }
          }
        }
      }, {immediate: true})
    })

    function pollActualFrame () {
      this.actualFrame = Math.floor($video.currentTime * this.framerate)
      window.requestAnimationFrame(pollActualFrame.bind(this))
    }
  }
}
</script>

<style lang="scss">
.st-video-scrolly {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  & > video {
    z-index: -1;
  }
}
</style>
