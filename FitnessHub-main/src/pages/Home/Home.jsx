import "./Home.css";
import Typewriter from "typewriter-effect";
import img2 from "../../assets/gym5.png";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaDumbbell, FaSmile } from "react-icons/fa";
import { MdFitnessCenter } from "react-icons/md";
import { FcSportsMode } from "react-icons/fc";
import { GiBiceps } from "react-icons/gi";
import { GiBodyBalance } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import img1 from "../../assets/aiImage.avif";
import nutritionImg from "../../assets/nutrition.png";
import { motion } from "framer-motion";
import Carousel from "../carousel/Carousel";
// import  from "../../assets/women-fitness.jpg";
import img3 from "../../assets/pregnancy.jpg"
import img4 from "../../assets/yoga.jpg"
import { FaArrowRight } from "react-icons/fa";
// import { Link } from 'react-router-dom';

const Home = () => {
  // Enhanced animation variants
  const pageLoad = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
  };






  return (
    <motion.div initial="hidden" animate="visible" variants={pageLoad}>
      <div className="home-container">
        <div className="home-left">
          <div className="logo-container">
            {[MdFitnessCenter, GiBodyBalance, GiBiceps, FcSportsMode].map(
              (Icon, index) => (
                <div
                  key={index}
                  
                >
                  <Icon className="home-logo" />
                </div>
              )
            )}
          </div>

          <h1>
            <Typewriter
              options={{
                strings: [
                  "Fitness Hub",
                  "IronEdge",
                  "FitHaven",
                  "FlexZone",
                  "MuscleForge",
                  "GymGrit",
                ],
                autoStart: true,
                loop: true,
                delay: 90,
                deleteSpeed: 50,
              }}
            />
          </h1>
          <p>
            Push yourself because no one else is going to do it for you!
          </p>

          <div
          
          >
            <Link to="/exercises">
              <button>Explore Now</button>
            </Link>
          </div>
        </div>

        <div
          className="home-right"
        >
          <img src={img2} alt="Gym" />
        </div>
      </div>

      <div
        className="benefits-section"
        
      >
        <h1>
          Benefits of <span>Exercises</span>
        </h1>
        <div className="benefits-cards" >
          {[
            {
              icon: FaHeartbeat,
              title: "Improves Heart Health",
              description:
                "Exercise strengthens your heart, reduces the risk of cardiovascular diseases, and improves circulation.",
            },
            {
              icon: FaDumbbell,
              title: "Builds Muscle Strength",
              description:
                "Regular workouts help in building muscle, improving endurance, and enhancing overall strength.",
            },
            {
              icon: FaSmile,
              title: "Boosts Mental Health",
              description:
                "Exercise releases endorphins, reduces stress, and uplifts mood for a happier life.",
            },
            {
              icon: FaDumbbell,
              title: "Builds Muscle Strength",
              description:
                "Regular workouts help in building muscle, improving endurance, and enhancing overall strength.",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="benefit-card"
            >
              <benefit.icon className="benefit-icon" />
              <h2>{benefit.title}</h2>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="container"
        
      >
        <div className="content">
          <div
            className="img-container"
            
          >
            <img src={img1} alt="Gym" />
          </div>
          <div className="text-container">
            <h3>Introducing AI workout planner</h3>
            <p>
              Consistency is the key to success in any journey. Start today!
            </p>
            <div>
              <Link to="/workout-planner">
                <button className="ai-button">Explore Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="calculators-section"

      >
        <h1>
          Our <span>Calculators</span>
        </h1>
        <div className="calculator-cards" >
          {[
            { path: "/bmi-calculator", icon: CgGym, title: "BMI Calculator" },
            {
              path: "/calorie-calculator",
              icon: MdOutlineSportsGymnastics,
              title: "Calorie Calculator",
            },
            {
              path: "/body-fat-calculator",
              icon: MdOutlineSportsGymnastics,
              title: "Body Fat Calculator",
            },
          ].map((calc, index) => (
            <div
              key={index}
            >
              <Link to={calc.path} className="calculator-card">
                <calc.icon />
                <h2>{calc.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div
        className="women-container"
        
      >
        <h1 
          className="women-main-title"
        >
          Women`s Health Section
        </h1>
        
        <div className="women-div">
          <div className="women-text-contain">
            
            <div className="features-grid">
              <div 
                className="feature-item"
                
              >
                <Link to="/pregnancy-weight-gain-calculator" style={{ textDecoration: 'none' }}>
                  <h3>Pregnancy Weight Gain Calculator</h3>
                </Link>
              </div>
              
              <div 
                className="feature-item"
                
              >
                <Link to='/periods-calculator' style={{ textDecoration: 'none' }}>
                <h3>Period Calculator</h3>
                </Link>
              </div>
              
              <div 
                className="feature-item"
                
              >
                <Link to='/conception-calculator' style={{ textDecoration: 'none' }}>
                <h3>Conception Calculator</h3>
                </Link>
              </div>
              
              <div 
                className="feature-item"
                
              >
                <h3>Community Support</h3>
              </div>
            </div>
          </div>

          <div
            className="women-image-container"
            
          >
            <img src={img3} alt="Women's Fitness" />
          </div>
        </div>
      </div>

      <section className="yoga-section">
        <div className="yoga-content">
          <div className="yoga-text">
            <h2>Embrace Wellness Through Yoga</h2>
            <p>
              Discover the perfect harmony of mind and body with our curated collection 
              of yoga poses. Whether you're a beginner or experienced practitioner, 
              find poses that suit your journey to wellness.
            </p>
            <Link to="/yoga" className="yoga-button">
              <span>Explore Now</span>
              <FaArrowRight className="arrow-icon" />
            </Link>
          </div>
          <div className="yoga-image">
            <img 
              src={img4} 
              alt="Pregnant woman doing yoga" 
              className="yoga-illustration"
            />
          </div>
        </div>
      </section>

      <div
        className="nutri-section"
        
      >
        <h1>
          Personalized <span>Nutrition</span> Plans
        </h1>
        <div className="nutri-content" >
          <div className="nutri-text" >
            {/* <h2>AI-Powered Nutrition Plans</h2> */}
            <ul className="nutri-features">
              {[
                { icon: "🥗", text: "Balanced macro and micronutrients" },
                { icon: "📊", text: "Detailed calorie tracking" },
                { icon: "🔄", text: "Regular plan adjustments" },
                // { icon: "📈", text: "Personalized recommendations" }
              ].map((feature, index) => (
                <li
                  key={index}
                  
                >
                  <span className="icon">{feature.icon}</span>
                  {feature.text}
                </li>
              ))}
            </ul>
            <div>
              <Link to="/nutrition">
                <button className="get-started-btn">Get Your Plan</button>
              </Link>
            </div>
          </div>
          <div
            className="nutri-image"
            
          >
            <img src={nutritionImg} alt="Nutrition Planning" />
          </div>
        </div>
      </div>

      <Carousel />
    </motion.div>
  );
};

export default Home;
