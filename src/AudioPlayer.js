import React, { useState, useEffect } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; // Import the styles
import './FileUpload.css';

const AudioPlayer = () => {
  const [filesList, setFilesList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    fetchFiles(); // Fetch files when component mounts
  }, []);

  const handleFileChange = (e) => {
    setError('');
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setError('Please select a file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('audio_file', file);

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error_message || 'Upload failed.');
      } else {
        console.log('File uploaded successfully!');
        // Refresh the file list after successful upload
        fetchFiles();
      }
    } catch (error) {
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setFilesList(data.files || []);
      } else {
        setError('Failed to fetch files.');
      }
    } catch (error) {
      setError('Failed to fetch files.');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handlePlay = (file) => {
    setSelectedFile(file);
  };

  const handleDelete = async (fileToDelete) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_name: fileToDelete }),
      });

      if (response.ok) {
        console.log(`File ${fileToDelete} deleted successfully!`);
        fetchFiles();
      } else {
        const data = await response.json();
        setError(data.error_message || 'Failed to delete the file.');
      }
    } catch (error) {
      setError('Failed to delete the file. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="audio/*" />
      <button onClick={handleUpload}>Upload</button>
      {loading && <div className="loader"></div>}
      {error && <p className="error-message">{error}</p>}
      <h2>Files Available:</h2>
      <ul>
        {filesList.map((file, index) => (
          <li key={index}>
            {file}
            <button onClick={() => handlePlay(file)}>Play</button>
            <button onClick={() => handleDelete(file)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedFile && (
        <div>
          <h3>Currently Playing: {selectedFile}</h3>
          <H5AudioPlayer
            src={`http://127.0.0.1:8000/play_audio/${selectedFile}`}
            autoPlayAfterSrcChange
            loop={true}

          />
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default AudioPlayer;
