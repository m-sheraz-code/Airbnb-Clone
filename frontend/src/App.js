import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LoginSignup from './pages/LoginSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookings/:id" element={<BookingPage />} />
        <Route path="/profile" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
