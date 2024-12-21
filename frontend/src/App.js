import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LoginSignup from './pages/LoginSignup';
import AddListing from './pages/AddListingPage';
import BookingList from './pages/BookingListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookings/:id" element={<BookingPage />} />
        <Route path="/profile" element={<LoginSignup />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/booking-list" element={<BookingList />} />
      </Routes>
    </Router>
  );
}

export default App;
