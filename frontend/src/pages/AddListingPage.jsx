import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function AddListing() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [guests, setGuests] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data for API submission
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('guests', guests);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/admin/listings', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Listing added successfully!');
        setTitle('');
        setType('');
        setCategory('');
        setPrice('');
        setGuests('');
        setBedrooms('');
        setBathrooms('');
        setImage(null);
      } else {
        setMessage('Error adding listing. Please try again.');
      }
    } catch (error) {
      console.error('Error adding listing:', error);
      setMessage('Error adding listing. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-listing-page">
        <div className="top-heading">
          <h1>Add New Listing</h1>
          <img
            src={require('../assets/pin.png')}
            className="pin-img"
            alt="Pin"
          />
        </div>
        <form onSubmit={handleSubmit} className="add-listing-form">
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
          <div>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="room">Room</option>
              <option value="top-cities">Top cities</option>
              <option value="amazing-views">Amazing views</option>
              <option value="trending">Trending</option>
              <option value="historical-homes">Historical homes</option>
              <option value="bed-breakfasts">Bed & breakfasts</option>
              <option value="mansions">Mansions</option>
              <option value="castle">Castle</option>
              <option value="omg">OMG</option>
            </select>
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Guests:</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Bedrooms:</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Bathrooms:</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <Footer />
    </>
  );
}

export default AddListing;
