import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';
import Navbar from '../Navbar/Navbar';

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state || { results: { photos: [], videos: [] } };

  return (
    <>
    <Navbar/>
    <div className="search-results">
      {results.photos.length > 0 || results.videos.length > 0 ? (
        <>
          {results.photos.map((photo) => (
            <div key={photo.id} className="photo">
              <img src={photo.src.medium} alt={photo.photographer} />
              <p>{photo.photographer}</p>
            </div>
          ))}
          {results.videos.map((video) => (
            <div key={video.id} className="video">
              <video controls>
                <source src={video.video_files[0].link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p>{video.user.name}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No results found</p>
      )}
    </div>
    </>
  );
};

export default SearchResults;
