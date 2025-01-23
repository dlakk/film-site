import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar'
import heo from '../../assets/hero.jpg';


function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=NX6A-eGRZfLrm45tpP1ccBH6qc8J6h7zzMoeS4Z0TV0`
      );
      setImages(response.data);
    };

    fetchImages();
  }, []);

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission, e.g., send data to server
      console.log('Form submitted:', formData);
    };

  return (
    <div className="home">
      <Navbar/>
      <div className="hero">
        <div className="hero-text">
          <h1>Capture Moments, Create Memories</h1>
          <p>Experience the art of photography and film making</p>
        </div>
        <img src={heo} alt="Hero" />
      </div>
      <div className="about-section">
        <h2>About Us</h2>
        <p>You make, we keep and help you inspire others. Whether photography or films, Snapreels captures the lens.</p>
        <div className="sample-section">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.regular}
              alt={image.alt_description}
              className="gallery-image"
            />
          ))}
        </div>
      </div>
      <div className="contact">
        <h2>Let's hear from you</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
      </div>
    </div>
  );
}

export default Home;
