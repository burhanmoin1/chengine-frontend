import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import the useParams hook

const EditGuitarist = () => {
  const [guitarist, setGuitarist] = useState({});
  const [formData, setFormData] = useState({});
  const { pk } = useParams(); // Use useParams here

  const fetchGuitarist = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/guitarists/${match.params.pk}/edit/`);
      setGuitarist(response.data.data);
      setFormData(response.data.data); // Initialize form data with guitarist details
    } catch (error) {
      console.error('Error fetching guitarist:', error);
    }
  };

  useEffect(() => {
    fetchGuitarist();
  }, [match.params.pk]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:8000/guitarists/${match.params.pk}/edit/`, formData);
      // Optionally, handle success or redirect to another page
    } catch (error) {
      console.error('Error editing guitarist:', error);
    }
  };

  return (
    <div>
      <h2>Edit Guitarist</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Guitar Brand:</label>
        <input
          type="text"
          name="guitar_brand"
          value={formData.guitar_brand || ''}
          onChange={handleInputChange}
        />
        <label>Guitar Model:</label>
        <input
          type="text"
          name="guitar_model"
          value={formData.guitar_model || ''}
          onChange={handleInputChange}
        />
        <label>Guitar Color:</label>
        <input
          type="text"
          name="guitar_color"
          value={formData.guitar_color || ''}
          onChange={handleInputChange}
        />
        <label>Number of Strings:</label>
        <input
          type="number"
          name="number_of_strings"
          value={formData.number_of_strings || ''}
          onChange={handleInputChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditGuitarist;
