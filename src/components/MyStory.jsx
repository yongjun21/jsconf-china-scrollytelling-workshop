import React from 'react'
import '@st-graphics/react-scrolly/dist/bundle.css'
import './MyStory.scss'

import StScrolly from '@st-graphics/react-scrolly'
import DynamicMap from './DynamicMap'

import * as data from '../data'

const features = data.features.reverse()

export default function MyStory () {
  const renderBackground = data => (
    <DynamicMap
      slideIndex={data.slideIndex}
      enter={data.enter}
      progress={data.progress}
      features={features} />
  )

  const children = features.map((f, i) => (
    <div className="slide" key={f.rank}>
      <p className="card">{f.name_chi} ({f.year})<br />{f.height} m</p>
    </div>
  ))

  return (
    <StScrolly className="my-story"
      renderBackground={renderBackground}>
      {children}
    </StScrolly>
  )
}
