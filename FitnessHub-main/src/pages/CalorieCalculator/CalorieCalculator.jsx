import { useState } from 'react';
import './CalorieCalculator.css';
import img1 from '../../assets/gym6-removebg-preview.png';

const CalorieCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('');
  const [calories, setCalories] = useState(null);
  const [maintenanceCalories, setMaintenanceCalories] = useState(null);
  const [weightLossCalories, setWeightLossCalories] = useState(null);
  const [weightGainCalories, setWeightGainCalories] = useState(null);

  const calculateCalories = () => {
    if (!age || !gender || !height || !weight || !activity) {
      alert('Please fill in all fields');
      return;
    }

    // BMR Calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'Male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'Female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity Level Adjustment
    let tdee;
    switch (activity) {
      case 'No Exercise':
        tdee = bmr * 1.2;
        break;
      case 'Exercise 1-3 times/week':
        tdee = bmr * 1.375;
        break;
      case 'Exercise 4-5 times/week':
        tdee = bmr * 1.55;
        break;
      case 'Intense Exercise 6-7 times/week':
        tdee = bmr * 1.725;
        break;
      default:
        tdee = bmr;
        break;
    }

    // Calculate Maintenance, Weight Loss, and Weight Gain Calories
    const maintenance = tdee;
    const weightLoss = tdee - tdee * 0.1;
    const weightGain = tdee + tdee * 0.1;

    // Update States
    setCalories(tdee.toFixed(2));
    setMaintenanceCalories(maintenance.toFixed(2));
    setWeightLossCalories(weightLoss.toFixed(2));
    setWeightGainCalories(weightGain.toFixed(2));
  };

  return (
    <div className="calorie-container">
      <h2 className="main-heading">Calorie Calculator</h2>
      <div className="form-container">
        <div className="calorie-form">
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>
          <div className="input-group radio-group">
            <label>Gender</label>
            <div className="radio-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height in cm"
            />
          </div>
          <div className="input-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight in kg"
            />
          </div>
          <div className="input-group">
            <label htmlFor="activity">Activity Level</label>
            <select
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <option value="">Select Activity Level</option>
              <option value="No Exercise">No Exercise</option>
              <option value="Exercise 1-3 times/week">Exercise 1-3 times/week</option>
              <option value="Exercise 4-5 times/week">Exercise 4-5 times/week</option>
              <option value="Intense Exercise 6-7 times/week">Intense Exercise 6-7 times/week</option>
            </select>
          </div>

          <button onClick={calculateCalories}>Calculate Calories</button>

          {calories && (
            <div className="calorie-result">
              <h3>Your Daily Caloric Needs: {calories} kcal</h3>
              <h3 className="weight-loss">Weight Loss Calories (0.25kg/week): {weightLossCalories} kcal</h3>
              <h3 className="weight-gain">Weight Gain Calories (0.25kg/week): {weightGainCalories} kcal</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
