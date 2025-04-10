import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import Exercises from './pages/Exercises/Exercises';
import BmiCalculator from './pages/BMICalculator/BmiCalculator';
import CalorieCalculator from './pages/CalorieCalculator/CalorieCalculator';
import ExercisesList from './pages/ExercisesList/ExercisesList';
import BodyFatCalculator from './pages/BodyFatCalculator/BodyFatCalculator';
import WorkoutPlanner from './pages/WorkoutPlanner/WorkoutPlanner';
import Footer from './components/footer/Footer';
import Nutrition from './pages/Nutrition/Nutrition';
// import Nav from './components/nav/Nav';
import PregnancyWeightGainCalculator from './pages/PregnancyWeightGainCalculator/PregnancyWeightGainCalculator';
import PeriodsCalculator from './pages/PeriodsCalculator/PeriodsCalculator';
import Conception from './pages/Conception/Conception';
import Yoga from './pages/Yoga/Yoga';
import ScrollToTop from './components/ScrollToTop';


const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      
      {/* <Nav /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/:bodyPart" element={<ExercisesList />} />
        <Route path="/bmi-calculator" element={<BmiCalculator />} />
        <Route path="/calorie-calculator" element={<CalorieCalculator />} />
        <Route path="/body-fat-calculator" element={<BodyFatCalculator />} />
        <Route path="/workout-planner" element={<WorkoutPlanner />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/pregnancy-weight-gain-calculator" element={<PregnancyWeightGainCalculator />} />
        <Route path="/periods-calculator" element={<PeriodsCalculator />} />
        <Route path="/conception-calculator" element={<Conception />} />
        <Route path="/yoga" element={<Yoga />} />
      </Routes>
     
      <Footer />
      </div>

  );
};

export default App;
