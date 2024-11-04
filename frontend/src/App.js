import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResult />} />
        <Route path="/bookings/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
