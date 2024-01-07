import React, { useState, useEffect } from 'react';
import './FileUpload.css'; // Import your CSS file
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [bucketDetails, setBucketDetails] = useState({});

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
        setBucketDetails(data.bucket_details || {}); // Store bucket details
      } else {
        setError('Failed to fetch files.');
      }
    } catch (error) {
      setError('Failed to fetch files.');
    }
  };

  const handleDelete = async (fileName) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_name: fileName }), // Pass file_name as JSON
      });
  
      if (!response.ok) {
        const data = await response.json();
        setError(data.error_message || 'Delete failed.');
      } else {
        console.log('File deleted successfully!');
        // Refresh the file list after successful deletion
        fetchFiles();
      }
    } catch (error) {
      setError('Delete failed. Please try again.');
    }
  };

  const handleAudioPlay = (fileName) => {
    setSelectedAudio(fileName);
  };

  return (
    <div className="file-upload-container">
      <input type="file" onChange={handleFileChange} accept="audio/*" />
      <button onClick={handleUpload}>Upload</button>
      {loading && <div className="loader"></div>}
      {error && <p className="error-message">{error}</p>}
      <div className="files-list">
        <h2>Files in the bucket:</h2>
        <ul>
          {filesList.map((file, index) => (
            <li key={index}>
              {file}
              <button onClick={() => handleDelete(file)}>Delete</button>
              <button onClick={() => handleAudioPlay(file)}>Play</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedAudio && bucketDetails.base_url && (
        <H5AudioPlayer
          autoPlay
          src={`${selectedAudio}`} // Construct URL using bucket details
          onPlay={() => console.log('Playing audio')}
        />
      )}
    </div>
  );
};

export default FileUpload;