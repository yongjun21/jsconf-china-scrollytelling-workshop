import React, {useState, useEffect, useRef} from 'react'
import './DynamicMap.scss'

import setupMap from '../services/setupMap'

function DynamicMap (props) {
  const $base = useRef(null)
  const mapRef = useRef(null)
  const [featureStateSetters, setFeatureStateSetters] = useState(null)
  
  const {features, slideIndex, enter, progress} = props
  const currentFeature = features[slideIndex]
  
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
      setFeatureStateSetters(featureStateSetters)
    })
  }, [features])

  useEffect(() => {
    if (!featureStateSetters) return
    featureStateSetters.forEach((setter, i) => {
      const highlighted = i === slideIndex
      setter({highlighted})
    })
  }, [featureStateSetters, slideIndex])

  useEffect(() => {
    if (!featureStateSetters) return
    featureStateSetters.forEach((setter, i) => {
      const factor = Math.max(enter(i, 300, 0), 1 - enter(i, 30, -300))
      setter({factor})
    })
  }, [featureStateSetters, enter])

  useEffect(() => {
    if (!featureStateSetters) return
    const map = mapRef.current
    const t = progress.at(features.length)(true)
    const b = (1 - t) * 190 + t * 60
    map.setBearing(b)
  }, [featureStateSetters, progress, features.length])

  return (
    <div className="dynamic-map">
      <div className="map-container" ref={$base}></div>
      <h1 className="rank">排名第 {currentFeature.rank}</h1>
    </div>
  )
}

export default DynamicMap
