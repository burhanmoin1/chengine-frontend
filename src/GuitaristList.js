import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link if using React Router

function GuitaristList() {
  const [guitarists, setGuitarists] = useState([]);

  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/guitarists/')
      .then(response => {
        setGuitarists(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (guitaristId) => {
    axios.delete(`http://127.0.0.1:8000/guitarists/${guitaristId}/delete/`)
      .then(response => {
        console.log('Guitarist deleted:', response.data);
        // Fetch updated data after deletion
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting guitarist:', error);
      });
  };

  useEffect(() => {
    // Fetch data from the API endpoint initially
    fetchData();

    // Refresh data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <h1>List of Guitarists</h1>
      <ul>
        {guitarists.map(guitarist => (
          <li key={guitarist._id}>
            <strong>Brand: </strong>{guitarist.guitar_brand}<br />
            <strong>Model: </strong>{guitarist.guitar_model}<br />
            <strong>Color: </strong>{guitarist.guitar_color}<br />
            <strong>Number of Strings: </strong>{guitarist.number_of_strings}<br />
            <Link to={`/edit/${guitarist._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(guitarist._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuitaristList;
