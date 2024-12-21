const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  id: { type: Number, required: true }, 
  image: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    enum: ['live', 'booked'],
    default: 'live',
  },
});

module.exports = mongoose.model('Listing', ListingSchema,'listings');
