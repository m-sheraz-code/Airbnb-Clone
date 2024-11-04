import { useLocation } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function SearchResult() {
  const location = useLocation();
  const { results, location: searchLocation } = location.state || { results: [], location: '' };

  return (
    <>
    <Navbar/>
    <div className="search-results-page">
      <h1>Results for "{searchLocation}"</h1>
      <div className="results-list">
        {results.length > 0 ? (
          results.map((result) => (
            <ListingCard
              key={result.id}
              id={result.id}
              image={result.image}
              title={result.title}
              type={result.type}
              guests={result.guests}
              bedrooms={result.bedrooms}
              bathrooms={result.bathrooms}
              price={result.price}
              rating={result.rating}
            />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default SearchResult;
