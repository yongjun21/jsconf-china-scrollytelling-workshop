import React, {useState, useRef, useCallback, useEffect} from 'react'
import './SimpleScrolly.scss'

export default function SimpleScrolly (props) {
  const $el = useRef()
  const $slides = useRef()

  // eslint-disable-next-line
  const [scrollPosition, setScrollPosition] = useState(-1)
  const [triggerPositions, setTriggerPositions] = useState([-1, -1, -1])

  const slideIndex = triggerPositions.filter(pos => pos >= 0).length - 1

  const stickyStyle = {
    backgroundColor: ['red', 'green', 'blue'][slideIndex] || 'red'
  }

  const measure = useCallback(frameRateLimited(() => {
    setScrollPosition(-$el.current.getBoundingClientRect().top)
    setTriggerPositions(Array.prototype.map.call(
      $slides.current.children,
      $slide => -$slide.getBoundingClientRect().top
    ))
  }), [])
  
  useEffect(() => {
    measure()
    window.addEventListener('scroll', measure)
    return () => window.removeEventListener('scroll', measure)
  }, [measure])

  return (
    <div className="simple-scrolly" ref={$el}>
      <div className="sticky-container">
        <div className="sticky-content" style={stickyStyle}></div>
      </div>

      <div className="slide-container" ref={$slides}>
        <div className="slide">
          <div className="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
        </div>
        <div className="slide">
          <div className="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
        </div>
        <div className="slide">
          <div className="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
        </div>
      </div>
    </div>
  )
}

function frameRateLimited (cb, context) {
  let ready = true
  function wrapped () {
    if (!ready) return
    ready = false
    window.requestAnimationFrame(() => {
      cb.apply(this, arguments)
      ready = true
    })
  }
  return context ? wrapped.bind(context) : wrapped
}
