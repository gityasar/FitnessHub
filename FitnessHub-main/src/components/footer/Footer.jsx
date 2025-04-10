
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className='footerH3'>Fitness Hub</h3>
          <p>Your ultimate destination for fitness guidance and workout planning. Transform your body and mind with our comprehensive exercise database.</p>
          <div className="social-links">
            <a href=""><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section class1">
          <h4 className='footerH4'>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/exercises">Exercises</Link></li>
            <li><Link to="/calorie-calculator">Calorie Calculator</Link></li>
            <li><Link to="/bmi-calculator">BMI Calculator</Link></li>
            <li><Link to="/workout-planner">Workout Planner</Link></li>
          </ul>
        </div>

        <div className="footer-section class1">
          <h4 className='footerH4'>Newsletter</h4>
          <p>Subscribe to our newsletter for tips and updates.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Made with 💙 by Yogesh Verma.</p>
      </div>
    </footer>
  );
};

export default Footer;