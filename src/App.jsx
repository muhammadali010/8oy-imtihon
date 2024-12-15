import React from 'react'
import Home from './pages/Home'
import Details from './pages/Details'
import { Routes, Route, } from 'react-router-dom'
import './App.css'


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/coin/:id' element={<Details></Details>}></Route>
      </Routes>
    </div>
  )
}

export default App