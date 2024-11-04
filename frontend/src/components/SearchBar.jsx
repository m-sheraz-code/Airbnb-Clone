import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/listings/search`, {
        params: { query: searchTerm }
      });
      const results = response.data;

      navigate('/search-results', { state: { results, searchTerm } });
    } catch (error) {
      alert(console.error('Error fetching search results:', error));
    }
  };

  return (
    <div className="search-main">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Hi! What are you looking for?" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch} className="search-btn">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
