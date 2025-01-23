import React, { useState } from 'react';
import './Navbar.css';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import profilephoto from '/profilephoto.jpg';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { logout } from '../../firebase';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      try {
        const [photosResponse, videosResponse] = await Promise.all([
          axios.get('https://api.pexels.com/v1/search', {
            params: { query: searchQuery, per_page: 5 },
            headers: {
              Authorization: 'w37ZgRkt9x4VNRGGiNcv5T1Ap01GWemEs4ppt1c7Hzp3m9nTdfeLZpFc'
            }
          }),
          axios.get('https://api.pexels.com/videos/search', {
            params: { query: searchQuery, per_page: 5 },
            headers: {
              Authorization: 'w37ZgRkt9x4VNRGGiNcv5T1Ap01GWemEs4ppt1c7Hzp3m9nTdfeLZpFc'
            }
          })
        ]);
        setSearchResults({ photos: photosResponse.data.photos, videos: videosResponse.data.videos });
        navigate(`/search?query=${searchQuery}`, { state: { results: { photos: photosResponse.data.photos, videos: videosResponse.data.videos } } });
      } catch (error) {
        console.error('Error fetching data from Pexels API:', error);
      }
    }
  };

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
          <form onSubmit={handleSearchSubmit}>
            <button type="submit">
              <FaSearch />
            </button>
            <input type="text" placeholder='Search' value={searchQuery} onChange={handleSearchChange} />
          </form>
        </div>
        {/* <div className="profile-menu">
          <img src={profilephoto} alt="Profile" />
          <div className="dropdown-menu">
            <div className='dropdown-item' onClick={() => navigate('/profile')}>Settings</div>
            <div className='dropdown-item' onClick={() => { logout() }}>Logout</div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default function Navbar() {
  return <Header />;
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
