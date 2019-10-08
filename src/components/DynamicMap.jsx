import React, {useState, useEffect, useRef} from 'react'
import './DynamicMap.scss'

import setupMap from '../services/setupMap'

function DynamicMap (props) {
  const $base = useRef(null)
  const mapRef = useRef(null)
  const [featureStateSetters, setFeatureStateSetters] = useState(null)
  
  const {slides, slideIndex, enter} = props
  const currentSlide = slides[slideIndex]

  const progressLastSlide = props.progress.at(slides.length)(true)
  
  useEffect(() => {
    mapRef.current = setupMap($base.current, map => {
      const features = map.querySourceFeatures('osmbuildings', {sourceLayer: 'building'})
      const featureStateSetters = slides.map(row => {
        const filtered = features.filter(row.filter)
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
  }, [slides])

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
    const t = progressLastSlide
    const b = (1 - t) * 190 + t * 60
    map.setBearing(b)
  }, [featureStateSetters, progressLastSlide])

  return (
    <div className="dynamic-map">
      <div className="map-container" ref={$base}></div>
      <h1 className="rank">排名第 {currentSlide.rank}</h1>
    </div>
  )
}

export default DynamicMap
