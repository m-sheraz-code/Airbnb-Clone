import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function AddListing() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
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
    <Navbar/>
    <div className="add-listing-page">
      <div className='top-heading'>
        <h1>Add New Listing</h1>
        <img src={require("../assets/pin.png")} className='pin-img' alt='Pin'/>
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
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
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
    <Footer/>
    </>
  );
}

export default AddListing;
