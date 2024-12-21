const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Import models
const Listing = require('./models/listing');
const Booking = require('./models/booking');
const User = require('./models/user');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'public/images'))); 

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin-only middleware
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};

// Routes
// User registration
app.post('/api/auth/register', async (req, res) => {
  const { username, password, role = 'user' } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      message: 'Login successful', 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        role: user.role 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Fetch all listings
app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error });
  }
});

// Fetch a specific listing
app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listing', error });
  }
});

// Search listings
app.get('/api/listings/search', async (req, res) => {
  const query = req.query.query ? req.query.query.toLowerCase() : '';

  try {
    const results = await Listing.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { type: new RegExp(query, 'i') },
        { category: new RegExp(query, 'i') },
      ],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching listings', error });
  }
});

// Create a booking
app.post('/api/bookings', authenticateJWT, async (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;

  try {
    const booking = new Booking({ listingId, userId: req.user.id, checkIn, checkOut });
    await booking.save();
     const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      { status: 'booked' },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
});


// Admin Routes
// Add a new listing
app.post('/api/admin/listings', authenticateJWT, authorizeAdmin, async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json({ message: 'Listing added successfully', listing });
  } catch (error) {
    res.status(500).json({ message: 'Error adding listing', error });
  }
});

// Delete a listing
app.delete('/api/admin/listings/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) return res.status(404).json({ message: 'Listing not found' });
    res.json({ message: 'Listing deleted successfully', deletedListing });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting listing', error });
  }
});

// View all bookings
app.get('/api/admin/bookings', authenticateJWT, authorizeAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('listingId userId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

// Clear all bookings
app.delete('/api/admin/bookings', authenticateJWT, authorizeAdmin, async (req, res) => {
  try {
    await Booking.deleteMany({});
    res.json({ message: 'All bookings have been cleared.' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing bookings', error });
  }
});

// Delete a specific booking
app.delete('/api/admin/bookings/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 
 