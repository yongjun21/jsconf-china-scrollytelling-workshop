import React from 'react'
import '@st-graphics/react-scrolly/dist/bundle.css'
import './MyStory.scss'

import StScrolly, {clamp} from '@st-graphics/react-scrolly'
import DynamicMap from './DynamicMap'

import {tallest} from '../data'

const slides = tallest.reverse()

export default function MyStory () {
  const renderBackground = data => (
    <DynamicMap
      slideIndex={clamp(data.slideIndex, 0, slides.length - 1)}
      enter={data.enter}
      progress={data.progress}
      slides={slides} />
  )

  const children = data => slides.map((slide, i) => (
    <div className="slide" key={slide.rank} style={getStyle(data.enter, i)}>
      <p className="card">{slide.name_chi} ({slide.year})<br />{slide.height} m</p>
    </div>
  )).concat(<div className="final slide" key="final"></div>)

  return (
    <StScrolly className="my-story"
      triggerOffset={-300}
      renderBackground={renderBackground}>
      {children}
    </StScrolly>
  )
}

function getStyle (enter, i) {
  return {
    opacity: enter(i, 400) || 0
  }
}