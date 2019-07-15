import React, {useState} from 'react'
import './MyStory.scss'

import StScrolly from './StScrolly'
import DynamicMap from './DynamicMap'

export default function MyStory () {
  const [slideContent] = useState([
    '滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。',
    '白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。',
    '是非成败转头空，青山依旧在，惯看秋月春风。',
    '一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。',
    '几度夕阳红。白发渔樵江渚上，都付笑谈中.......'
  ])

  const background = props => (
    <DynamicMap slideIndex={props.slideIndex} slideCount={props.slideCount}></DynamicMap>
  )

  const slides = props => slideContent.map((p, i) => (
    <div className="slide" key={i} style={{opacity: props.enter(i, 400) || 0}}>
      <p className="card">{p}</p>
    </div>
  ))

  return (
    <StScrolly className="my-story" triggerOffset={-100}
      background={background}
      slides={slides}>
    </StScrolly>
  )
}