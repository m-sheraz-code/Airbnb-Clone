import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import SearchBar from './SearchBar';
import Categories from './Categories';

function TotalCards() {
  const [listings, setListings] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        const data = await response.json();
        setListings(data);
        setFilteredResults(data); // Set initial filtered results to all listings
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    const results = listings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredResults(results);
  }, [searchTerm, selectedCategory, listings]);

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <Categories onCategorySelect={setSelectedCategory} />

      <div className="total-cards">
        {filteredResults.length > 0 ? (
          filteredResults.map((listing) => (
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
          ))
        ) : (
          <h1 style={{ textAlign: 'center', color: 'black' }}>No results found!</h1>
        )}
      </div>
    </div>
  );
}

export default TotalCards;
