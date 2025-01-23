import React, { useState, useEffect } from 'react';
import './Gallery.css';
import axios from 'axios';
import { FaHeart, FaComment, FaDownload } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [showCommentSection, setShowCommentSection] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos', {
          params: {
            client_id: 'NX6A-eGRZfLrm45tpP1ccBH6qc8J6h7zzMoeS4Z0TV0',
            per_page: 12,
          }
        });
        const updatedItems = response.data.map(item => ({
          ...item,
          comments: [],
        }));

        setGalleryItems(updatedItems);
      } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
      }
    };

    fetchImages();
  }, []);

  const handleLike = (itemId) => {
    setGalleryItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleComment = (itemId) => {
    const commentText = commentInputs[itemId] || '';
    if (commentText.trim() === '') return;

    setGalleryItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.comments.length < 5
          ? { ...item, comments: [...item.comments, commentText] }
          : item
      )
    );
    setCommentInputs(prevInputs => ({
      ...prevInputs,
      [itemId]: '',
    }));
  };

  const handleDownload = (imageUrl, imageAlt) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageAlt || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommentInputChange = (e, itemId) => {
    const { value } = e.target;
    setCommentInputs(prevInputs => ({
      ...prevInputs,
      [itemId]: value,
    }));
  };

  const toggleCommentSection = (itemId) => {
    setShowCommentSection(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleKeyDown = (e, itemId) => {
    if (e.key === 'Enter') {
      handleComment(itemId);
    }
  };

  return (
    <><Navbar/>
    <div className="gallery-page">
      
      {galleryItems.map(item => (
        <div className="gallery-item" key={item.id}>
          <img src={item.urls.regular} alt={item.alt_description || item.description} />
          <div className="item-overlay">
            <div className="overlay-icons">
              <span onClick={() => handleLike(item.id)}>
                <FaHeart /> {item.likes}
              </span>
              <span onClick={() => toggleCommentSection(item.id)}>
                <FaComment /> {item.comments.length}
              </span>
              <span onClick={() => handleDownload(item.urls.full, item.alt_description)}>
                <FaDownload />
              </span>
            </div>
          </div>
          {showCommentSection[item.id] && (
            <div className="comment-section">
              <div className="comments">
                {item.comments.map((comment, index) => (
                  <div key={index} className="comment">{comment}</div>
                ))}
              </div>
              {item.comments.length < 5 && (
                <div className="comment-input">
                  <input
                    type="text"
                    value={commentInputs[item.id] || ''}
                    onChange={(e) => handleCommentInputChange(e, item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    placeholder="Add a comment"
                  />
                  <button onClick={() => handleComment(item.id)}>Add Comment</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default GalleryPage;