import React, {useState, useEffect, useRef} from 'react'
import './DynamicMap.scss'

import setupMap from '../services/setupMap'

function DynamicMap (props) {
  const $base = useRef(null)
  const mapRef = useRef(null)
  const [featureStateSetters, setFeatureStateSetters] = useState(null)
  
  const {features, slideIndex, enter, progress} = props
  
  useEffect(() => {
    mapRef.current = setupMap($base.current, map => {
      const mapFeatures = map.querySourceFeatures('osmbuildings', {sourceLayer: 'building'})
      const featureStateSetters = features.map(row => {
        const filtered = mapFeatures.filter(row.filter)
        return state => filtered.forEach(f => {
          map.setFeatureState({
            source: 'osmbuildings',
            sourceLayer: 'building',
            id: f.id
          }, state)
        })
      })
      // example usage
      featureStateSetters[0]({highlighted: true})
      setFeatureStateSetters(featureStateSetters)
    })
  }, [features])

  // HINT: https://st-scrolly.netlify.com/react/#using-slideindex-when-render-props-are-in-function-form

  // HINT: https://st-scrolly.netlify.com/react/#using-enter-exit-when-render-props-are-in-function-form

  // HINT: https://st-scrolly.netlify.com/react/#using-progress-when-render-props-are-in-function-form

  return (
    <div className="dynamic-map">
      <div className="map-container" ref={$base}></div>
      <h1 className="rank">排名第 {'XXX'}</h1>
    </div>
  )
}

export default DynamicMap
