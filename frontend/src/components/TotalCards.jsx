import ListingCard from './ListingCard';

const listings = [
  {
    image: require('../assets/products/image1.jpg'),
    title: 'Cozy Apartment',
    type: 'Apartment',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 120,
    rating: 4.5,
  },
  {
    image: require('../assets/products/image2.jpg'),
    title: 'Modern Villa',
    type: 'Villa',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    price: 250,
    rating: 4.8,
  },
  {
    image: require('../assets/products/image3.jpg'),
    title: 'Beach House',
    type: 'House',
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    price: 400,
    rating: 3,
  },
  {
    image: require('../assets/products/image4.jpg'),
    title: 'Mountain Cabin',
    type: 'Cabin',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 180,
    rating: 4.7,
  },
  {
    image: require('../assets/products/image5.jpg'),
    title: 'City Loft',
    type: 'Loft',
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    price: 150,
    rating: 4.6,
  },
  {
    image: require('../assets/products/image6.jpg'),
    title: 'Countryside Cottage',
    type: 'Cottage',
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    price: 200,
    rating: 4.7,
  },
  {
    image: require('../assets/products/image7.jpg'),
    title: 'Luxury Penthouse',
    type: 'Penthouse',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 300,
    rating: 4.9,
  },
  {
    image: require('../assets/products/image8.jpg'),
    title: 'Rustic Barn',
    type: 'Barn',
    guests: 7,
    bedrooms: 3,
    bathrooms: 2,
    price: 220,
    rating: 4.4,
  },
  {
    image: require('../assets/products/image9.jpg'),
    title: 'Seaside Bungalow',
    type: 'Bungalow',
    guests: 6,
    bedrooms: 2,
    bathrooms: 2,
    price: 260,
    rating: 4.8,
  },
];

function TotalCards() {
  return (
    <div className="total-cards">
      {listings.map((listing, index) => (
        <ListingCard
          key={index}
          image={listing.image}
          title={listing.title}
          type={listing.type}
          guests={listing.guests}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          price={listing.price}
          rating={listing.rating}
        />
      ))}
    </div>
  );
}

export default TotalCards;
