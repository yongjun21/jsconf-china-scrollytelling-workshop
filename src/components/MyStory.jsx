import React from 'react'
import '@st-graphics/react-scrolly/dist/bundle.css'
import './MyStory.scss'

import StScrolly, {clamp} from '@st-graphics/react-scrolly'
import DynamicMap from './DynamicMap'

import * as data from '../data'

const features = data.features.reverse()

export default function MyStory () {
  const renderBackground = data => (
    <DynamicMap
      slideIndex={clamp(data.slideIndex, 0, features.length - 1)}
      enter={data.enter}
      progress={data.progress}
      features={features} />
  )

  const children = data => features.map((f, i) => (
    <div className="slide" key={f.rank}>
      <p className="card" style={getStyle(data.enter, i)}>{f.name_chi} ({f.year})<br />{f.height} m</p>
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