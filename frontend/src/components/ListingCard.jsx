import React from 'react';
import { useNavigate } from 'react-router-dom';

function ListingCard({ id, image, title, type, guests, bedrooms, bathrooms, price, rating }) {
  const navigate = useNavigate();
  const fullImageUrl = `http://localhost:5000${image}`;

  const handleCardClick = () => {
    navigate(`/listings/${id}`); 
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starType = (i <= Math.floor(rating)) ? 'fa-star' : 'fa-star-o';
      const halfStar = (i === Math.ceil(rating) && !Number.isInteger(rating)) ? 'fa-star-half-o' : starType;
      stars.push(
        <i
          key={i}
          style={{ fontSize: '13px', color: '#FFD700', marginRight: '1px' }}
          className={`fa ${halfStar}`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="listing-card" onClick={handleCardClick}>
      <div className="image-container">
        <img src={fullImageUrl} alt={title} className="listing-image" />
        <div className="live-tag"><strong>Live</strong></div>
      </div>
      <div className="listing-info">
        <h3>{title}</h3>
        <p>{type} · {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms</p>
        <div className="price-section">
          <p><span>${price}</span> per guest</p>
          <p className="hosted-by">
            <span className="star-section">
              {renderStars()}&nbsp;({rating})
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
