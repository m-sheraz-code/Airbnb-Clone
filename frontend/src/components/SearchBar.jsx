import {useState} from 'react';

function SearchBar() {
    const [location, setLocation] = useState('');
    
    const handleSearch = () => {
      console.log(`Searching for ${location}`);
    };
    
    return (
      <div className='search-main'>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Hi! Where you want to go?"
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
          <button onClick={handleSearch} className="search-btn"><i style={{fontSize: '20px',color: 'white'}} class="fa">&#xf002;</i></button>
        </div>
      </div>
    );
  }
  export default SearchBar;
 