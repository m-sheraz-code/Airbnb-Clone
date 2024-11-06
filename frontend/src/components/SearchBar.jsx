import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
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
