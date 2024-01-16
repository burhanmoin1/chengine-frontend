import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditGuitarist() {
  const { guitaristId } = useParams();
  const navigate = useNavigate();
  const [guitarist, setGuitarist] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    // Fetch data for a specific guitarist based on the ID from the route
    axios.get(`http://127.0.0.1:8000/guitarists/${guitaristId}/`)
      .then(response => {
        setGuitarist(response.data);
        setUpdatedData(response.data); // Save the data for manipulation
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [guitaristId]);

  const handleInputChange = (e) => {
    // Update the specific field being edited
    const { name, value } = e.target;
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Send a PUT request to update the guitarist's data
    axios.put(`http://127.0.0.1:8000/guitarists/${guitaristId}/update/`, updatedData)
      .then(response => {
        console.log('Guitarist updated:', response.data);
        // Navigate to the homepage upon successful update
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  // Render the form for editing guitarist data
  return (
    <div>
      <h1>Edit Guitarist</h1>
      <form>
        <label>
          Guitar Brand:
          <input
            type="text"
            name="guitar_brand"
            value={updatedData.guitar_brand || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Guitar Model:
          <input
            type="text"
            name="guitar_model"
            value={updatedData.guitar_model || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Guitar Color:
          <input
            type="text"
            name="guitar_color"
            value={updatedData.guitar_color || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Number of Strings:
          <input
            type="text"
            name="number_of_strings"
            value={updatedData.number_of_strings || ''}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
}

export default EditGuitarist;
