import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // Load the username from localStorage on component mount
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      setUsername(user ? user.username : null);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    setUsername(null); // Reset username
    navigate('/'); // Redirect to home
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={require('../assets/logo.png')} alt="Airbnb Logo" />
        </Link>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        <i className={menuOpen ? "fa fa-times" : "fa fa-bars"}></i>
      </button>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/">
          <i className="fa fa-home" style={{ marginRight: '8px' }}></i>
          Home
        </Link>
        <Link to="/experiences">
          <i className="fa fa-map-marker" style={{ marginRight: '8px' }}></i>
          Experiences
        </Link>
        <Link to="/online-experiences">
          <i className="fa fa-laptop" style={{ marginRight: '8px' }}></i>
          Online Experiences
        </Link>
        <div className="right-menu-mobile">
          {username && (
            <Link to="/add-listing">
              <i
                style={{
                  fontSize: '24px',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '50%',
                  backgroundColor: '#ff385c',
                  border: 'none',
                }}
                className="fa fa-plus"></i>
              <p>Add New</p>
            </Link>
          )}
          <Link to="/profile">
            <i
              style={{
                fontSize: '24px',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '50%',
                backgroundColor: '#ff385c',
              }}
              className="fa fa-user"></i>
            <p>{username ? username : 'Login / Signup'}</p>
          </Link>
          {username && (
            <Link onClick={handleLogout}>
              <i
                style={{
                  fontSize: '24px',
                  color: 'white',
                  padding: '10px 13px',
                  borderRadius: '50%',
                  backgroundColor: '#ff385c',
                  border: 'none',
                  cursor: 'pointer',
                }}
                className="fa fa-power-off"></i>
              <p>Log Out</p>
            </Link>
          )}
        </div>
      </div>

      <div className="right-menu">
        {username && (
            <Link to="/add-listing">
              <i
                style={{
                  fontSize: '24px',
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '50%',
                  backgroundColor: '#ff385c',
                  border: 'none',
                }}
                className="fa fa-plus"></i>
              <p>Add New</p>
            </Link>
        )}
        <Link to="/profile">
          <i
            style={{
              fontSize: '24px',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '50%',
              backgroundColor: '#ff385c',
            }}
            className="fa fa-user"></i>
          <p>{username ? username : 'Login / Signup'}</p>
        </Link>
        {username && (
          <Link onClick={handleLogout}>
            <i
              style={{
                fontSize: '24px',
                color: 'white',
                padding: '10px 13px',
                borderRadius: '50%',
                backgroundColor: '#ff385c',
                border: 'none',
                cursor: 'pointer',
              }}
              className="fa fa-power-off"></i>
            <p>Log Out</p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
