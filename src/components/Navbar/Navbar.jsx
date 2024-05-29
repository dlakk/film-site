import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import profilephoto from '/profilephoto.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();// navigate through the different routes

  const handleSearchChange = (event) => {//updates the searchQuery state whenever the user types in the search input
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {//prevents the default form submission 
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
}

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
    <div className='search'>
    <input type="text" placeholder='Search'/>
    <FontAwesomeIcon icon={faSearch} className='icon'/>
    </div>
   <div className="profile-menu">
    <img src={profilephoto} alt="" />
    <div className="dropdown-menu">
      <div className='dropdown-item' onClick={() => navigate('/settings')}>Settings</div>
      <div className='dropdown-item' onClick={() => navigate('/logout')}>Logout</div>
    </div>
   </div>
  </div>
    </div>
  )
   
}

export default Navbar