import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        navigate('/'); 
      } catch (error) {
        setError('Invalid credentials');
      }
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
  
      try {
        await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
        setIsLogin(true);
        setError('');
      } catch (error) {
        setError('Error registering user');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-signup-container">
        <div className="top-heading">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <img src={require('../assets/pin.png')} className="pin-img" alt="Pin" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group role-input">
                <label>Role ?</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={role === 'user'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    User
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="host"
                      checked={role === 'host'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    Host
                  </label>
                </div>
              </div>
            </>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>

        <div className="toggle-link">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
              type="button"
              className="link-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginSignup;
