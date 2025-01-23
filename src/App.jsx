import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';

import Gallery from './pages/Gallery/Gallery';
import Videos from './pages/Videos/Videos';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './components/SearchResults/SearchResults'
// import { ToastContainer } from 'react-toastify';
import UserProfile from './pages/UserProfile/UserProfile';


function App (){
  const navigate = useNavigate();
  
  useEffect (()=>{
    onAuthStateChanged(auth, async (user)=>{
      if (user){
        console.log("Logged In");
        navigate('/')
      }else{
        console.log("Logged Out");
        navigate('/login')
      }
    })
  },[])
  return( 
      <div className="content">
        <ToastContainer theme='dark'/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/videos" element={<Videos/>} />
          <Route path="/login" element={<Login/>} />   
          <Route path="/profile" element={<UserProfile/>} />   

        <Route path="/search" element={<SearchResults />} />
    </Routes>
    <Footer/>
    </div>
       
    
  )
}

export default App