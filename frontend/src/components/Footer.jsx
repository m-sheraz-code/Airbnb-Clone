import logo2 from '../assets/logo2.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo2} alt="Airbnb Logo" />
      </div>
      <ul className="footer-menu">
        <li>Support</li>
        <li>Community</li>
        <li>Hosting</li>
        <li>About</li>
      </ul>
      <div className="footer-social-media">
        <div className="social-icons">
          <i className="fa fa-instagram"></i>
          <i className="fa fa-twitter"></i>
          <i className="fa fa-youtube"></i>
        </div>
      </div>
      <p className="copyright">&copy; 2024 Airbnb, Inc. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
