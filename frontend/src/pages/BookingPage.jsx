import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then(response => response.json())
      .then(data => setListing(data));
  }, [id]);

  const calculateTotalPrice = () => {
    // Dummy calculation for demonstration
    const nights = 1; // Replace with actual nights calculation
    setTotalPrice(nights * listing.price);
  };

  const handleBooking = () => {
    fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: id, checkIn, checkOut }),
    })
      .then(response => response.json())
      .then(data => alert(data.message));
  };

  return (
    <div>
      {listing ? (
        <>
          <h1>Booking for {listing.title}</h1>
          <label>Check-in Date: <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /></label>
          <label>Check-out Date: <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></label>
          <button onClick={calculateTotalPrice}>Calculate Total</button>
          <p>Total Price: ${totalPrice}</p>
          <button onClick={handleBooking}>Confirm Booking</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookingPage;
