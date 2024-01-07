import React, { useEffect } from 'react';
import axios from 'axios';

const TokenLogger = () => {
  useEffect(() => {
    // Retrieve the token from localStorage
    const sessionToken = localStorage.getItem('sessionToken');

    // Log the token to the console
    console.log('Session Token:', sessionToken);

    // Send a POST request to the Django API view for token verification
    const verifyToken = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/check-authenticated/', {
          session_token: sessionToken,
        });

        if (response.status === 200) {
          console.log('Token verified successfully');
          console.log('User ID:', response.data.user_id);
        }
      } catch (error) {
        console.error('Token verification failed:', error.message);
      }
    };

    // Call the function to verify the token
    verifyToken();
  }, []);

  return (
    <div>
      <h2>Token Logger</h2>
      {/* You can add more content or functionality here if needed */}
    </div>
  );
};

export default TokenLogger;
