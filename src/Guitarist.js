import React, { useState } from 'react';
import axios from 'axios';

function AddGuitarist() {
  const [formData, setFormData] = useState({
    guitar_brand: '',
    guitar_model: '',
    guitar_color: '',
    number_of_strings: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/create_guitarist/', formData)
      .then(response => {
        console.log('Guitarist added successfully:', response.data);
        // Reset the form after successful submission
        setFormData({
          guitar_brand: '',
          guitar_model: '',
          guitar_color: '',
          number_of_strings: ''
        });
      })
      .catch(error => {
        console.error('Error adding guitarist:', error);
      });
  };

  return (
    <div>
      <h2>Add New Guitarist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="guitar_brand">Guitar Brand:</label>
          <input
            type="text"
            id="guitar_brand"
            name="guitar_brand"
            value={formData.guitar_brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="guitar_model">Guitar Model:</label>
          <input
            type="text"
            id="guitar_model"
            name="guitar_model"
            value={formData.guitar_model}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="guitar_color">Guitar Color:</label>
          <input
            type="text"
            id="guitar_color"
            name="guitar_color"
            value={formData.guitar_color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="number_of_strings">Number of Strings:</label>
          <input
            type="number"
            id="number_of_strings"
            name="number_of_strings"
            value={formData.number_of_strings}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Guitarist</button>
      </form>
    </div>
  );
}

export default AddGuitarist;
