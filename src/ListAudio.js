import React, { useState } from 'react';

const ListAudio = ({ file }) => {
  const [signedURL, setSignedURL] = useState('');

  const fetchSignedURL = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_signed_url/${file}`);
      if (response.ok) {
        const data = await response.json();
        setSignedURL(data.signed_url);
      } else {
        console.error('Failed to fetch signed URL');
      }
    } catch (error) {
      console.error('Error fetching signed URL:', error);
    }
  };

  const handlePlay = () => {
    if (!signedURL) {
      fetchSignedURL();
    } else {
      const audio = new Audio(signedURL);
      audio.play().catch((error) => console.error('Audio playback error:', error));
    }
  };

  return (
    <div>
      <button onClick={handlePlay}>Play Audio</button>
    </div>
  );
};

export default ListAudio;
