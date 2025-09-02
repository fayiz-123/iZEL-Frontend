import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { Route,Routes } from 'react-router-dom'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import AdminDashboard from './pages/admin/AdminDashboard'


function App() {


  return (
    <>
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/gallery' element={<GalleryPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
    </Routes>
    </>
  )
}

export default App
