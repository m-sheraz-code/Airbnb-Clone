import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import SearchBar from './SearchBar';
import Categories from './Categories';

function TotalCards() {
  const [listings, setListings] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        const data = await response.json();
        setListings(data);
        setFilteredResults(data);
      } catch (error) {
        setError("Error fetching listings");
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false); 
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

  if (loading) {
    return <div className='preloader'>Loading...</div>;
  }

  if (error) {
    return <h1 style={{ textAlign: 'center', color: 'red' }}>{error}</h1>;
  }

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
          <div className='preloader'>No results found!</div>
        )}
      </div>
    </div>
  );
}

export default TotalCards;
