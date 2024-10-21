import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/home"><img src={require('../assets/logo.png')} alt="Airbnb Logo" /></a>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        <i className={menuOpen ? "fa fa-times" : "fa fa-bars"}></i> {/* Toggle between burger and close icon */}
      </button>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <a href="/home">
          <i className="fa fa-home" style={{ marginRight: '8px' }}></i>
          Home
        </a>
        <a href="/experiences">
          <i className="fa fa-map-marker" style={{ marginRight: '8px' }}></i>
          Experiences
        </a>
        <a href="/online-experiences">
          <i className="fa fa-laptop" style={{ marginRight: '8px' }}></i>
          Online Experiences
        </a>
        <div className="right-menu-mobile">
        <a href="/profile">
          <i
            style={{
              fontSize: '24px',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '50%',
              backgroundColor: '#ff385c',
            }}
            className="fa fa-user"></i>
            <p>Login / Singup</p>
        </a>
      </div>
      </div>

      <div className="right-menu">
        <a href="/profile">
          <i
            style={{
              fontSize: '24px',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '50%',
              backgroundColor: '#ff385c',
            }}
            className="fa fa-user"></i>
            <p>Login / Singup</p>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
