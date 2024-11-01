const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

//static Data
const listings = [
    {
      id: 1,
      image: '/images/image1.jpg',
      title: 'Cozy Apartment',
      type: 'Apartment',
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      price: 120,
      rating: 4.5,
      category: 'Amazing views',
    },
    {
      id: 2,
      image: '/images/image2.jpg',
      title: 'Modern Villa',
      type: 'Villa',
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      price: 250,
      rating: 4.8,
      category: 'Trending',
    },
    {
      id: 3,
      image: '/images/image3.jpg',
      title: 'Beach House',
      type: 'House',
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      price: 400,
      rating: 3,
      category: 'Seaside',
    },
    {
      id: 4,
      image: '/images/image4.jpg',
      title: 'Mountain Cabin',
      type: 'Cabin',
      guests: 4,
      bedrooms: 2,
      bathrooms: 1,
      price: 180,
      rating: 4.7,
      category: 'Amazing views',
    },
    {
      id: 5,
      image: '/images/image5.jpg',
      title: 'City Loft',
      type: 'Loft',
      guests: 3,
      bedrooms: 1,
      bathrooms: 1,
      price: 150,
      rating: 4.6,
      category: 'Top cities',
    },
    {
      id: 6,
      image: '/images/image6.jpg',
      title: 'Countryside Cottage',
      type: 'Cottage',
      guests: 5,
      bedrooms: 2,
      bathrooms: 2,
      price: 200,
      rating: 4.7,
      category: 'Historical homes',
    },
    {
      id: 7,
      image: '/images/image7.jpg',
      title: 'Luxury Penthouse',
      type: 'Penthouse',
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: 300,
      rating: 4.9,
      category: 'Trending',
    },
    {
      id: 8,
      image: '/images/image8.jpg',
      title: 'Rustic Barn',
      type: 'Barn',
      guests: 7,
      bedrooms: 3,
      bathrooms: 2,
      price: 220,
      rating: 4.4,
      category: 'OMG',
    },
    {
      id: 9,
      image: '/images/image9.jpg',
      title: 'Seaside Bungalow',
      type: 'Bungalow',
      guests: 6,
      bedrooms: 2,
      bathrooms: 2,
      price: 260,
      rating: 4.8,
      category: 'Trending',
    },
];

// Routes
app.get('/api/listings', (req, res) => res.json(listings));

app.get('/api/listings/:id', (req, res) => {
  const listing = listings.find(l => l.id === parseInt(req.params.id));
  if (listing) res.json(listing);
  else res.status(404).json({ message: 'Listing not found' });
});

app.get('/api/listings/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const results = listings.filter(listing => listing.title.toLowerCase().includes(query));
  res.json(results);
});

app.post('/api/bookings', (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;
  res.json({
    message: 'Booking created successfully',
    booking: { listingId, checkIn, checkOut }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
