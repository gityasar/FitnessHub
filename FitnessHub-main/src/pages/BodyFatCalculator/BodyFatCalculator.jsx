import { useState } from "react";
import "./BodyFatCalculator.css";
import img1 from "../../assets/gym8.png";

const BodyFatCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBodyFat = () => {
    if (gender === "male") {
      const bodyFatPercentage =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
      setBodyFat(bodyFatPercentage.toFixed(2));
    } else {
      const bodyFatPercentage =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + neck) +
            0.221 * Math.log10(height)) -
        450;
      setBodyFat(bodyFatPercentage.toFixed(2));
    }
  };

  return (
    <div className="body-fat-calculator-container">
      <h1>Body Fat Calculator</h1>
      <div className="body-fat-content">
        {/* <img src={img1} alt="Gym Illustration" className="gym-image" /> */}
        <form
          className="body-fat-form"
          onSubmit={(e) => {
            e.preventDefault();
            calculateBodyFat();
          }}
        >
          <div className="form-group">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              required
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          <div className="form-group">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight(kg)"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height(cm)"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              placeholder="Neck(cm) circumference"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="Waist(cm)"
              required
            />
          </div>

          <button type="submit">Calculate Body Fat</button>
        </form>
      </div>

      {bodyFat !== null && (
        <div className="result">
          <h2>Your Body Fat Percentage:</h2>
          <p>{bodyFat}%</p>
        </div>
      )}
    </div>
  );
};

export default BodyFatCalculator;
