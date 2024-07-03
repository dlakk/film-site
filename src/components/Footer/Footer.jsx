import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <span onClick={() => navigate('/')}>Home</span>
          <span onClick={() => navigate('/gallery')}>Gallery</span>
          <span onClick={() => navigate('/about')}>About</span>
          <span onClick={() => navigate('/contact')}>Contact</span>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} SnapReels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
