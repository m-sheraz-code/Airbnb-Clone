
function ListingCard({ image, title, type, guests, bedrooms, bathrooms, price, rating }) {
  return (
    <div className="listing-card">
      <div className="image-container">
        <img src={image} alt={title} className="listing-image" />
        <div className="live-tag">Live</div>
      </div>
      <div className="listing-info">
        <h3>{title}</h3>
        <p>{type} · {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms</p>
        <p>${price} per guest</p>
        <p className="hosted-by">Hosted by: {rating}</p>
      </div>
    </div>
  );
}



export default ListingCard;