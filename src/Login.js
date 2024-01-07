import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID library
import { Link } from 'react-router-dom'; // Import Link component from React Router

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Generate a unique token using UUID
    const sessionToken = uuidv4();

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        email,
        password,
        session_token: sessionToken, // Send the generated token to the backend
      });

      if (response.status === 200) {
        // Login successful, save token to localStorage
        localStorage.setItem('sessionToken', sessionToken);

        // Redirect to the homepage after successful login
        window.location.reload();
        // Handle further actions (if needed)
        console.log('Login successful');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;
