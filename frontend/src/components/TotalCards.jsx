import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import SearchBar from './SearchBar';
import Categories from './Categories';

function TotalCards() {
  const [listings, setListings] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        if (!response.ok) throw new Error('Failed to fetch listings');
        const data = await response.json();
        setListings(data);
        setFilteredResults(data);
      } catch (err) {
        setError(err.message || 'Error fetching listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const results = listings.filter((listing) => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredResults(results);
  }, [searchTerm, selectedCategory, listings]);

  const handleDeleteListing = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete listing');
      }

      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Error deleting listing:', error);
    }
  };

  if (loading) {
    return (
      <div className="preloader">Loading...</div>
    );
  }

  if (error) {
    return <h1 style={{ textAlign: 'center', color: 'red' }}>{error}</h1>;
  }

  if (!loading && listings.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>No listings available at the moment.</h2>;
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
              id={listing._id}
              image={listing.image}
              title={listing.title}
              type={listing.type}
              guests={listing.guests}
              bedrooms={listing.bedrooms}
              bathrooms={listing.bathrooms}
              price={listing.price}
              rating={listing.rating}
              onDelete={handleDeleteListing}
              status={listing.status}
            />
          ))
        ) : (
          <div className='preloader' style={{ height: '100px' }}>No results found!</div>
        )}
      </div>
    </div>
  );
}

export default TotalCards;
