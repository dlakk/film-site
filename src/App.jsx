import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Gallery from './pages/Gallery/Gallery';
import Videos from './pages/Videos/Videos';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';

function App (){
  return( 
    <>
      <Navbar />
      <div className="content">
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/videos" element={<Videos/>} />
          <Route path="/login" element={<Login/>} />   
    </Routes>
    </div>
    <Footer/>    
    </>
  )
}

export default App