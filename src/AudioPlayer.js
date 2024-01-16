import React, { useState, useEffect } from 'react';
import axios from 'axios';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './FileUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the trash icon

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
        // Refresh the file list after a successful upload
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

        // Sort files by size and last modified date
        const sortedFiles = data.files.sort((a, b) => b.size.localeCompare(a.size) || new Date(b.last_modified) - new Date(a.last_modified));

        setFilesList(sortedFiles || []);
      } else {
        setError('Failed to fetch files.');
      }
    } catch (error) {
      setError('Failed to fetch files.');
    }
  };

  const handlePlay = (file) => {
    setSelectedFile(file.file_name);
  };

  const handleDelete = async (key) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/delete/${key}/`);
      if (response.status === 200) {
        console.log(`File with key ${key} deleted successfully!`);
        // Refresh the file list after a successful delete
        fetchFiles();
      }
    } catch (error) {
      console.error('Delete failed', error);
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
            <FontAwesomeIcon icon={faPlay} onClick={() => handlePlay(file)} style={{ cursor: 'pointer' }} />
            {' '}
            {file.file_name} - Last Modified: {file.last_modified} - Size: {file.size}
            {' '}
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(file.file_name)} style={{ cursor: 'pointer' }} />
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
