import React, { useRef } from 'react';
import ReactPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop } from '@fortawesome/free-solid-svg-icons';

const MusicPlayer = () => {
  const audioFileName = 'Logic_Inglorious_Basterd - Inglorious Basterd - 10 Starfield.mp3'; // Replace with your actual file name
  const playerRef = useRef(null);

  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.audio.current.pause(); // Pauses the audio
      playerRef.current.audio.current.currentTime = 0; // Resets the audio to the beginning
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <h3 style={{color: '#818181', fontFamily: 'Bebas Neue', fontSize: '23px'}}>{audioFileName}</h3>
      <ReactPlayer
        ref={playerRef}
        src={`/mp3/${audioFileName}`}
        autoPlay={false}
        style={{ maxWidth: '500px' }}
        loop={true}
        controls
      />
      <button onClick={handleStop} style={{ position: 'absolute', cursor:'pointer', fontSize: '22px', bottom: '0%', left: '18%', color:'#818181', transform: 'translate(-50%, -50%)', zIndex: '2', border: 'none', background: 'none'}}>
        <FontAwesomeIcon icon={faStop} />
      </button>
    </div>
  );
};

export default MusicPlayer;
