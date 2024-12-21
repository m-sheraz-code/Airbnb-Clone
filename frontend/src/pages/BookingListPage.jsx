import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Error Response:', errorMessage);
          throw new Error(errorMessage || 'Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleClearBooking = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/bookings/', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error Response:', errorMessage);
        throw new Error(errorMessage || 'Failed to clear bookings');
      }
      const result = await response.json();
      console.log(result.message);
      setBookings([]); // Clear bookings on the client side after successful deletion
    } catch (err) {
      console.error('Error:', err.message);
      alert('Failed to clear bookings. Please try again.');
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error Response:', errorMessage);
        throw new Error(errorMessage || 'Failed to delete booking');
      }
      const result = await response.json();
      console.log(result.message);

      // Remove the deleted booking from the state
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (err) {
      console.error('Error:', err.message);
      alert('Failed to delete booking. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="booking-list">
        <h1>Booking List</h1>
        {bookings.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Listing</th>
                  <th>User</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>{booking.listingId?.title || 'N/A'}</td>
                    <td>{booking.userId?.username || 'N/A'}</td>
                    <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleDeleteBooking(booking._id)}>
                        <i className="fa fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
        <button onClick={handleClearBooking}>Clear</button>
      </div>
      <Footer />
    </>
  );
};

export default BookingList;
