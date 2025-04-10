import { useState } from 'react';
import './BmiCalculator.css';

const BmiCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBmi = () => {
    if (!age || !gender || !height || !weight) {
      alert('Please fill in all fields');
      return;
    }
    
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    
    setBmi(calculatedBmi.toFixed(2));
    
    // Set category and corresponding class
    if (calculatedBmi < 18.5) {
      setCategory('Underweight');
    } else if (calculatedBmi < 24.9) {
      setCategory('Normal weight');
    } else if (calculatedBmi < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const getCategoryClass = () => {
    switch(category) {
      case 'Underweight': return 'category-underweight';
      case 'Normal weight': return 'category-normal';
      case 'Overweight': return 'category-overweight';
      case 'Obesity': return 'category-obese';
      default: return '';
    }
  };

  return (
    <div className="bmi-container">
      <h1 className="main-heading">BMI Calculator</h1>
      <div className="bmi-content">
        <div className="bmi-form">
          <h2>Calculate Your BMI</h2>
          <div className="input-group">
            <label className="input-label">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              min="0"
              max="120"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height in cm"
              min="0"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight in kg"
              min="0"
            />
          </div>

          <button onClick={calculateBmi}>Calculate BMI</button>

          {bmi && (
            <div className="bmi-result">
              <h3>Your BMI: {bmi}</h3>
              <p>Category: <span className={`category ${getCategoryClass()}`}>{category}</span></p>
            </div>
          )}

          <div className="bmi-scale">
            <div className="scale-bar"></div>
            <div className="scale-labels">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
