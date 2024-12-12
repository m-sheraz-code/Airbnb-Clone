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
        setFilteredResults(data);  // Initialize filtered results with all listings
      } catch (error) {
        setError("Error fetching listings");
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    // Filter listings whenever the search term or category changes
    const results = listings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredResults(results);
  }, [searchTerm, selectedCategory, listings]);  

  if (loading) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
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
              key={listing._id}
              id={listing._id} 
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
          <h1 className='preloader'>No results found!</h1>
        )}
      </div>
    </div>
  );
}

export default TotalCards;
