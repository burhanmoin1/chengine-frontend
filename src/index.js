import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import HomePage from './HomePage';
import Login from './Login';
import TokenLogger from './TokenChecker';
import axios from 'axios';
import SignUpComponent from './SignUpPage';
import EditGuitarist from './GuitaristEdit';

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');

    const verifyToken = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/check-authenticated/', {
          session_token: sessionToken,
        });

        if (response.status === 200) {
          console.log('Token verified successfully');
          console.log('User ID:', response.data.user_id);
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Token verification failed:', error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Show a loading indicator while verifying the token
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={authenticated ? <HomePage /> : <Login />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/tokenchecking" element={<TokenLogger />} />
          <Route path="/edit/:guitaristId" element={<EditGuitarist />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

const domNode = document.getElementById('root');
render(<App />, domNode);