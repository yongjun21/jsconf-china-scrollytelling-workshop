import React from 'react'
import './App.css'

import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
import MyStory from './components/MyStory'

export default function App () {
  return (
    <div id="app">
      <MyHeader></MyHeader>
      <MyStory></MyStory>
      <MyFooter></MyFooter>
    </div>
  )
}
