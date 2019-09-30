<div class="my-story">
  <StScrolly triggerOffset={-300} let:enter>
    <div slot="background" let:slideIndex let:enter>
      <DynamicMap
        slideIndex={clamp(slideIndex, 0, slides.length - 1)}
        {enter}
        {slides} />
    </div>

    {#each slides as slide, i (slide.rank)}
      <div class="slide" style={`opacity: ${enter(i, 400)}`}>
        <p class="card">{slide.name_chi} ({slide.year})<br>{slide.height} m</p>
      </div>
    {/each}
  </StScrolly>
</div>

<script>
import StScrolly, {clamp} from './StScrolly.svelte'
import DynamicMap from './DynamicMap.svelte'

import {tallest} from '../data'

const slides = tallest.reverse()
</script>

<style lang="scss">
.my-story {
  [slot="background"] {
    height: 100%;
  }

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
