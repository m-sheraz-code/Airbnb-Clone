import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListingCard({ id, image, title, type, guests, bedrooms, bathrooms, price, rating, onDelete, status }) {
  const [showModal, setShowModal] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const fullImageUrl = `http://localhost:5000${image}`;

  useEffect(() => {
    const updateUserRole = () => {
      try {
        const userData = localStorage.getItem('user');
        const user = userData ? JSON.parse(userData) : null;
        setUserRole(user ? user.role : null);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    };

    updateUserRole();

    // Add event listener to update role on logout
    window.addEventListener('storage', updateUserRole);

    return () => {
      window.removeEventListener('storage', updateUserRole);
    };
  }, []);

  const handleCardClick = () => {
    if (status === 'live') {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleBooking = () => {
    navigate(`/bookings/${id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starType = i <= Math.floor(rating) ? 'fa-star' : 'fa-star-o';
      const halfStar = i === Math.ceil(rating) && !Number.isInteger(rating) ? 'fa-star-half-o' : starType;
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
    <div>
      <div className="listing-card" onClick={handleCardClick}>
        <div className="image-container">
          <img src={fullImageUrl} alt={title} className="listing-image" />
          <div className="live-tag" style={{ textTransform: 'capitalize' }}><strong>{status}</strong></div>
          {userRole === 'admin' && (
            <div onClick={handleDelete} className="del-btn">
              <i className="fa fa-solid fa-trash"></i>
            </div>
          )}
        </div>
        <div className="listing-info">
          <h3>{title}</h3>
          <p>{type} · {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms</p>
          <div className="price-section">
            <p><span>${price}</span> per night</p>
            <p className="hosted-by">
              <span className="star-section">
                {renderStars()}&nbsp;({rating})
              </span>
            </p>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={fullImageUrl} alt={title} className="img-fluid" />
          <ul className="list-unstyled two-column-list">
            <li>
              <i className="fa fa-tag" style={{ color: '#ff385c' }}></i>
              <span>&nbsp;Type: </span> &nbsp;{type}
            </li>
            <li>
              <i className="fa fa-user" style={{ color: '#ff385c' }}></i>
              <span>&nbsp;Guests: </span>&nbsp; {guests}
            </li>
            <li>
              <i className="fa fa-bed" style={{ color: '#ff385c' }}></i>
              <span>&nbsp;Bedrooms: </span>&nbsp; {bedrooms}
            </li>
            <li>
              <i className="fa fa-bath" style={{ color: '#ff385c' }}></i>
              <span>&nbsp;Bathrooms: </span>&nbsp; {bathrooms}
            </li>
            <li>
              <i className="fa fa-dollar" style={{ color: '#ff385c' }}></i>
              <span>&nbsp;Price per night: </span>&nbsp; ${price}
            </li>
            <li>
              <i className="fa fa-star" style={{ color: '#ff385c' }}></i>
              <span>&nbsp;Rating: </span>&nbsp; {rating} Stars
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListingCard;
