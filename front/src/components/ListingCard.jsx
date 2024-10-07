function ListingCard({ image, title, type, guests, bedrooms, bathrooms, price, rating }) {
    return (
      <div className="listing-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{type} · {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms</p>
        <p>${price} / night</p>
        <p>Rating: {rating}</p>
      </div>
    );
  }
  export default ListingCard;
  