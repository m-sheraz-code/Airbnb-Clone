import { useState } from 'react';

function SearchBar() {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log(`Searching for ${location}`);
  };

  return (
    <div className="search-main">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Hi! Where do you want to go?" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
        <button onClick={handleSearch} className="search-btn">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
