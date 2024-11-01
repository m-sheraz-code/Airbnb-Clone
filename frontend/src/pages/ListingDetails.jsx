import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then(response => response.json())
      .then(data => setListing(data));
  }, [id]);

  return (
    <div>
      {listing ? (
        <>
          <h1>{listing.title}</h1>
          <p>Type: {listing.type}</p>
          <p>Amenities: {listing.amenities.join(', ')}</p>
          <p>Guests: {listing.guests}</p>
          <p>Bedrooms: {listing.bedrooms}</p>
          <p>Bathrooms: {listing.bathrooms}</p>
          <p>Price per night: ${listing.price}</p>
          <button onClick={() => navigate(`/booking/${id}`)}>Book Now</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ListingDetails;
