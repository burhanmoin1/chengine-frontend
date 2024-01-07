import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          <li key={guitarist.id}>
            <strong>Brand: </strong>{guitarist.guitar_brand}<br />
            <strong>Model: </strong>{guitarist.guitar_model}<br />
            <strong>Color: </strong>{guitarist.guitar_color}<br />
            <strong>Number of Strings: </strong>{guitarist.number_of_strings}<br />
            {/* Display other guitarist properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuitaristList;
