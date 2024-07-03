import React from 'react'
import './Navbar.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
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

export default function Navbar () {
  return (
    <div className='navbar'>
  <div className="navbar-left">
    <Link to="/" className='logo'>
    snapreels
    </Link>
    <ul>
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/gallery">Gallery</CustomLink>
      <CustomLink to="/videos">Videos</CustomLink>
      <CustomLink to="">About</CustomLink>
      <CustomLink to="">Contact us</CustomLink>
      <CustomLink to="/login">Upload</CustomLink>
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


function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path:resolvedPath.pathname, end:true})
  return(
    <li className={isActive ? "active": ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

