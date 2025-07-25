import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllBlogs from './Components/AllBlogs.jsx';
import ContactPage from './Components/ContactPage';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import LoginPage from './Components/LoginPage';
import './App.css'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/allblogs' element={<AllBlogs />}/>
          <Route path="/login" element={<LoginPage />} />
         <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
