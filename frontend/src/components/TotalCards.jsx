import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';

function TotalCards() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="total-cards">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          id={listing.id} 
          image={listing.image}
          title={listing.title}
          type={listing.type}
          guests={listing.guests}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          price={listing.price}
          rating={listing.rating}
        />
      ))}
    </div>
  );
}

export default TotalCards;
