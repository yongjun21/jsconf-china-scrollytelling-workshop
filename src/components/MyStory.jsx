import React, {useState} from 'react'
import '@st-graphics/react-scrolly/dist/bundle.css'
import './MyStory.scss'

import StScrolly from '@st-graphics/react-scrolly'
import DynamicMap from './DynamicMap'

export default function MyStory () {
  const [slideContent] = useState([
    '滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。',
    '白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。',
    '是非成败转头空，青山依旧在，惯看秋月春风。',
    '一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。',
    '几度夕阳红。白发渔樵江渚上，都付笑谈中.......'
  ])

  const renderBackground = data => (
    <DynamicMap slideIndex={data.slideIndex} slideCount={data.slideCount}></DynamicMap>
  )

  const children = data => slideContent.map((p, i) => (
    <div className="slide" key={i} style={getStyle(data.enter, i)}>
      <p className="card">{p}</p>
    </div>
  ))

  return (
    <StScrolly className="my-story" triggerOffset={-100} renderBackground={renderBackground}>
      {children}
    </StScrolly>
  )
}

function getStyle (enter, i) {
  return {
    opacity: enter(i, 400) || 0
  }
}