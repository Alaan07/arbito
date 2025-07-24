import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Components/Homepage.jsx'
import AllBlogs from './Components/AllBlogs.jsx';
import './App.css'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/allblogs' element={<AllBlogs />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
