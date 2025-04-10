
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css';
import Typewriter from 'typewriter-effect';


const Navbar = () => {
  const location = useLocation();
  


  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
            <div className="navbar-typewriter">
            <Typewriter
              options={{
                strings: [
                  "Eat 🍽️",
                  "Sleep 😴",
                  "Workout 🏋",
                  "Repeat 🔁"
                ],
                autoStart: true,
                loop: true,
                delay: 90,
                deleteSpeed: 50,
                cursor: '|',
              }}
            />
            </div>
          </Link>
        </div>

        <div className={`navbar-links`}>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active-link' : ''}
            
          >
            Home
          </Link>
          <Link 
            to="/exercises" 
            className={location.pathname === '/exercises' ? 'active-link' : ''}
            
          >
            Exercises
          </Link>
          <Link 
            to="/bmi-calculator" 
            className={location.pathname === '/bmi-calculator' ? 'active-link' : ''}
          
          >
            BMI Calculator
          </Link>

          <Link 
            to="/workout-planner" 
            className={location.pathname === '/workout-planner' ? 'active-link' : ''}
            
          >
            Workout Planner
          </Link>

          
        </div>
      </nav>
      

    </>
  );
};

export default Navbar;