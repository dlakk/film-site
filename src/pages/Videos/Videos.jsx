import React, { useState, useEffect } from 'react';
import './Videos.css';
import axios from 'axios';
import { FaPlay } from 'react-icons/fa';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://api.pexels.com/videos/popular', {
          headers: {
            Authorization: 'w37ZgRkt9x4VNRGGiNcv5T1Ap01GWemEs4ppt1c7Hzp3m9nTdfeLZpFc'
          },
          params: {
            per_page: 10, // Number of videos to fetch
          }
        });
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos from Pexels:', error);
      }
    };

    fetchVideos();
  }, []);

  const handlePlay = (videoId) => {
    const videoElement = document.getElementById(`video-${videoId}`);
    if (videoElement) {
      videoElement.play();
    }
  };

  return (
    <div className="videos-page">
      {videos.map(video => (
        <div className="video-item" key={video.id}>
          <video id={`video-${video.id}`} src={video.video_files[0].link} controls={false} />
          <FaPlay className="play-button" onClick={() => handlePlay(video.id)} />
        </div>
      ))}
    </div>
  );
};

export default VideosPage;
