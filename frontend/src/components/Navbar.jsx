import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"><img src={require('../assets/logo.png')} alt="Airbnb Logo" /></Link>
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
            <p>Login / Signup</p>
          </Link>
        </div>
      </div>

      <div className="right-menu">
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
          <p>Login / Signup</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
