import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Navbar () {
  return (
    <div className='navbar'>
  <div className="navbar-left">
    <img src={logo} alt="logo" />
    <p>snapreels</p>
    <ul>
      <a href=""><li>Home</li></a>
      <a href=""><li>Gallery</li></a>
      <a href=""><li>Videos</li></a>
      <a href=""><li>About</li></a>
      <a href=""><li>Contact us</li></a>
    </ul>
  </div>
  <div className="navbar-right">
    <input type="text" placeholder='Search'/>
    <FontAwesomeIcon icon={faSearch}/>
    
  </div>
    </div>
  )
   
}

export default Navbar