import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function BookingPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [name, setName] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  const handleBooking = async () => {
    if (!checkIn || !checkOut || !name) {
      alert("Please fill in all fields and ensure the number of guests is valid.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        listingId: id,
        checkIn,
        checkOut,
        name,
      });

      if (response.status === 200) {
        setBookingSuccess(true);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert("There was an issue creating your booking. Please try again.");
    }
  };

  const calculateTotal = () => {
    const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    return nights > 0 ? nights * listing.price: 0;
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <>
      <Navbar/>
      <div className='Booking-hero-section' style={{ backgroundImage: `url(http://localhost:5000${listing.image})` }}>
        <h1 className='Booking-hero-section-text'>Book {listing.title}</h1>
      </div>
      <div className="booking-page">
        <h1 className='top-heading'>Fill the Form</h1>

        <div className="booking-details">
            <ul className="list-unstyled two-column-list">
              <li>
                <i className="fa fa-tag" style={{ color: '#ff385c' }}></i>
                <span>&nbsp;Type: </span> &nbsp;{listing.type}
              </li>
              <li>
                <i className="fa fa-user" style={{ color: '#ff385c' }}></i>
                <span>&nbsp;Guests: </span>&nbsp; {listing.guests}
              </li>
              <li>
                <i className="fa fa-bed" style={{ color: '#ff385c' }}></i>
                <span>&nbsp;Bedrooms: </span>&nbsp; {listing.bedrooms}
              </li>
              <li>
                <i className="fa fa-bath" style={{ color: '#ff385c' }}></i>
                <span>&nbsp;Bathrooms: </span>&nbsp; {listing.bathrooms}
              </li>
              <li>
                <i className="fa fa-dollar" style={{ color: '#ff385c' }}></i>
                <span>&nbsp;Price per night: </span>&nbsp; ${listing.price}
              </li>
              <li>
                <i className="fa fa-star" style={{ color: '#ff385c' }}></i>
                <span>&nbsp;Rating: </span>&nbsp; {listing.rating} Stars
              </li>
           </ul>
        </div>

        <div className="booking-form">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>
          <label>
            Check-in:
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </label>
          <label>
            Check-out:
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </label>
          <button onClick={handleBooking} className="btn btn-primary">
            Confirm Booking
          </button>
        </div>

        {bookingSuccess && (
          <div className="booking-success">
            <p>Booking successful!</p>
            <p>Total Cost: ${calculateTotal()}</p>
            <button onClick={() => navigate('/')} className="btn btn-home">
              Return to Home
            </button>
          </div>
        )} 

        </div>
      <Footer/>
    </>
  );
}

export default BookingPage;
