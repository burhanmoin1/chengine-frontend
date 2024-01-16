import React, { useState } from 'react';
import axios from 'axios';

const FileRemovalComponent = ({ file_name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRemoveFile = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/delete/${file_name}/`);
      setSuccessMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data.error_message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleRemoveFile} disabled={isLoading}>
        Remove File
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default FileRemovalComponent;
