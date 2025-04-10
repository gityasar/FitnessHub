import { useState } from 'react';
import './PregnancyWeightGainCalculator.css';
import { FaInfoCircle, FaTable, FaAppleAlt, FaExclamationTriangle } from 'react-icons/fa';

const PregnancyWeightGainCalculator = () => {
  const [formData, setFormData] = useState({
    currentWeek: '',
    isTwins: 'no',
    height: '',
    weightBefore: '',
    currentWeight: ''
  });

  const [result, setResult] = useState(null);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getRecommendedWeightGain = (bmi, isTwins) => {
    if (isTwins === 'yes') {
      if (bmi < 18.5) return { min: 22.7, max: 28.1 };
      if (bmi < 24.9) return { min: 16.8, max: 24.5 };
      if (bmi < 29.9) return { min: 14.1, max: 22.7 };
      return { min: 11.3, max: 19.1 };
    } else {
      if (bmi < 18.5) return { min: 12.7, max: 18.1 };
      if (bmi < 24.9) return { min: 11.3, max: 15.9 };
      if (bmi < 29.9) return { min: 6.8, max: 11.3 };
      return { min: 5.0, max: 9.1 };
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', class: 'category-underweight' };
    if (bmi < 24.9) return { category: 'Normal Weight', class: 'category-normal' };
    if (bmi < 29.9) return { category: 'Overweight', class: 'category-overweight' };
    return { category: 'Obese', class: 'category-obese' };
  };

  const calculateWeightGain = () => {
    const { currentWeek, isTwins, height, weightBefore, currentWeight } = formData;

    if (!currentWeek || !height || !weightBefore || !currentWeight) {
      alert('Please fill in all fields');
      return;
    }

    const bmiBeforePregnancy = calculateBMI(weightBefore, height);
    const currentBMI = calculateBMI(currentWeight, height);
    const recommendedGain = getRecommendedWeightGain(bmiBeforePregnancy, isTwins);
    
    // Calculate expected weight gain for each week
    const weeklyData = [];
    const totalWeeks = 40;
    
    for (let week = 1; week <= totalWeeks; week++) {
      let expectedGain;
      if (week <= 12) {
        // First trimester: 1-2 pounds total
        expectedGain = (recommendedGain.min / 40) * week;
      } else {
        // After first trimester: 0.5-1 pound per week
        expectedGain = (recommendedGain.min / 40) * week;
      }
      weeklyData.push({
        week,
        expectedGain: expectedGain.toFixed(1)
      });
    }

    // Calculate recommended weight range for current week
    const currentWeekGainMin = (recommendedGain.min / 40) * currentWeek;
    const currentWeekGainMax = (recommendedGain.max / 40) * currentWeek;
    
    const currentWeekRange = {
      min: (Number(weightBefore) + currentWeekGainMin).toFixed(1),
      max: (Number(weightBefore) + currentWeekGainMax).toFixed(1)
    };

    setResult({
      bmiBeforePregnancy,
      bmiBeforeCategory: getBMICategory(bmiBeforePregnancy),
      currentBMI,
      currentBMICategory: getBMICategory(currentBMI),
      currentWeightGain: (currentWeight - weightBefore).toFixed(1),
      recommendedGainRange: recommendedGain,
      weeklyData,
      currentWeek,
      currentWeekRange,
      recommendedWeightRange: {
        min: (Number(weightBefore) + recommendedGain.min).toFixed(1),
        max: (Number(weightBefore) + recommendedGain.max).toFixed(1)
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const weightGainTable = [
    {
      bmi: '<18.5',
      category: 'Underweight',
      singletonGain: '28-40 lbs',
      twinGain: '-'
    },
    {
      bmi: '18.5-24.9',
      category: 'Normal Weight',
      singletonGain: '25-35 lbs',
      twinGain: '37-54 lbs'
    },
    {
      bmi: '25.0-29.9',
      category: 'Overweight',
      singletonGain: '15-25 lbs',
      twinGain: '31-50 lbs'
    },
    {
      bmi: '>30.0',
      category: 'Obese',
      singletonGain: '11-20 lbs',
      twinGain: '25-42 lbs'
    }
  ];

  const weightDistribution = [
    { component: 'Enlarged breasts', weight: '1-3 pounds' },
    { component: 'Enlarged uterus', weight: '2 pounds' },
    { component: 'Placenta', weight: '1.5 pounds' },
    { component: 'Amniotic fluid', weight: '2 pounds' },
    { component: 'Increased blood volume', weight: '3-4 pounds' },
    { component: 'Increased fluid volume', weight: '2-3 pounds' },
    { component: 'Fat stores', weight: '6-8 pounds' }
  ];

  return (
    <div className="pregnancy-calculator-container">
      <h1 className="main-heading">Pregnancy Weight Gain Calculator</h1>
      
      <div className="calculator-content">
        <div className="calculator-form">
          <div className="input-group">
            <label>Current Week of Pregnancy</label>
            <input
              type="number"
              name="currentWeek"
              value={formData.currentWeek}
              onChange={handleInputChange}
              min="1"
              max="40"
              placeholder="Enter week (1-40)"
            />
          </div>

          <div className="input-group">
            <label>Pregnant with Twins?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="isTwins"
                  value="no"
                  checked={formData.isTwins === 'no'}
                  onChange={handleInputChange}
                />
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="isTwins"
                  value="yes"
                  checked={formData.isTwins === 'yes'}
                  onChange={handleInputChange}
                />
                Yes
              </label>
            </div>
          </div>

          <div className="input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter height in cm"
            />
          </div>

          <div className="input-group">
            <label>Weight Before Pregnancy (kg)</label>
            <input
              type="number"
              name="weightBefore"
              value={formData.weightBefore}
              onChange={handleInputChange}
              placeholder="Enter pre-pregnancy weight"
            />
          </div>

          <div className="input-group">
            <label>Current Weight (kg)</label>
            <input
              type="number"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleInputChange}
              placeholder="Enter current weight"
            />
          </div>

          <button onClick={calculateWeightGain} >Calculate</button>
        </div>

        {result && (
          <div className="results-section">
            <h2>Results</h2>
            
            <div className="result-grid">
              <div className="result-item">
                <h3>BMI Before Pregnancy</h3>
                <p>{result.bmiBeforePregnancy}</p>
                <span className={`bmi-category ${result.bmiBeforeCategory.class}`}>
                  {result.bmiBeforeCategory.category}
                </span>
              </div>
              
              <div className="result-item">
                <h3>Current BMI</h3>
                <p>{result.currentBMI}</p>
                <span className={`bmi-category ${result.currentBMICategory.class}`}>
                  {result.currentBMICategory.category}
                </span>
              </div>

              <div className="result-item">
                <h3>Current Weight Gain</h3>
                <p>{result.currentWeightGain} kg</p>
              </div>

              <div className="result-item">
                <h3>Recommended Weight Range at Week {result.currentWeek}</h3>
                <p>{result.currentWeekRange.min} - {result.currentWeekRange.max} kg</p>
              </div>

              <div className="result-item full-width">
                <h3>Recommended Weight Range at Week 40 (Full Term)</h3>
                <p>{result.recommendedWeightRange.min} - {result.recommendedWeightRange.max} kg</p>
              </div>
            </div>

            <div className="weight-gain-graph">
              <h3>Expected Weight Gain by Week</h3>
              <div className="graph-container">
                <div className="graph-y-axis">
                  <span>kg</span>
                </div>
                <div className="graph-content">
                  {result.weeklyData.map((data) => (
                    <div 
                      key={data.week} 
                      className="graph-bar"
                      style={{ 
                        height: `${(data.expectedGain / result.recommendedGainRange.max) * 100}%`
                      }}
                    >
                      <span className="graph-tooltip">
                        Week {data.week}: {data.expectedGain} kg
                      </span>
                    </div>
                  ))}
                </div>
                <div className="graph-x-axis">
                  <span>Weeks</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pregnancy-info-section">
        <div className="info-card-wrapper">
          <div className="info-card-header">
            <FaInfoCircle className="info-icon" />
            <h2>About Pregnancy Weight Gain</h2>
          </div>
          
          <div className="info-card-content">
            <div className="info-highlight">
              <p className="intro-text">
                Pregnancy brings significant changes to women`s bodies. Weight gain during this period is both 
                <span className="highlight">normal and necessary</span> to ensure:
              </p>
              <div className="highlight-points">
                <div className="highlight-item">
                  <div className="highlight-icon">👶</div>
                  <p>Proper fetal development</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🍼</div>
                  <p>Preparation for breastfeeding</p>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">💪</div>
                  <p>Maternal health maintenance</p>
                </div>
              </div>
            </div>

            <div className="recommendations-box">
              <h3>General Weight Gain Guidelines</h3>
              <div className="recommendations-grid">
                <div className="recommendation-item">
                  <div className="recommendation-header">
                    <span className="phase">First Trimester</span>
                    <span className="weight">1-4 lbs</span>
                  </div>
                  <p>During the first 3 months of pregnancy</p>
                </div>
                <div className="recommendation-item">
                  <div className="recommendation-header">
                    <span className="phase">Second & Third Trimester</span>
                    <span className="weight">1 lb/week</span>
                  </div>
                  <p>During the remainder of pregnancy</p>
                </div>
                <div className="recommendation-item">
                  <div className="recommendation-header">
                    <span className="phase">Daily Calories</span>
                    <span className="calories">+300</span>
                  </div>
                  <p>Additional calories needed per day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="tables-section">
          <div className="info-card-wrapper">
            <div className="info-card-header">
              <FaTable className="info-icon" />
              <h2>Weight Gain Guidelines</h2>
            </div>
            <div className="info-card-content">
              <div className="tables-grid">
                <div className="table-container">
                  <h3>Recommended Weight Gain by BMI</h3>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Prepregnancy BMI</th>
                          <th>Category</th>
                          <th>Single Pregnancy</th>
                          <th>Twins</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weightGainTable.map((row, index) => (
                          <tr key={index} className="table-row-hover">
                            <td>{row.bmi}</td>
                            <td>
                              <span className={`category-badge category-${row.category.toLowerCase()}`}>
                                {row.category}
                              </span>
                            </td>
                            <td>{row.singletonGain}</td>
                            <td>{row.twinGain}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="table-container">
                  <h3>Weight Distribution During Pregnancy</h3>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Body Component</th>
                          <th>Weight Gain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weightDistribution.map((row, index) => (
                          <tr key={index} className="table-row-hover">
                            <td>{row.component}</td>
                            <td>
                              <span className="weight-badge">{row.weight}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card-wrapper">
            <div className="info-card-header">
              <FaAppleAlt className="info-icon" />
              <h2>Nutrition & Health Guidelines</h2>
            </div>
            <div className="info-card-content">
              <div className="nutrition-grid">
                <div className="nutrition-card">
                  <div className="nutrition-icon">🥬</div>
                  <h3>Folate & Folic Acid</h3>
                  <div className="nutrition-content">
                    <p>Helps prevent birth defects and protects against neural tube defects.</p>
                    <div className="sources-list">
                      <h4>Best Sources:</h4>
                      <ul>
                        <li>Leafy greens</li>
                        <li>Citrus fruits</li>
                        <li>Beans</li>
                        <li>Peas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="nutrition-card">
                  <div className="nutrition-icon">🥛</div>
                  <h3>Calcium</h3>
                  <div className="nutrition-content">
                    <p>Supports strong bones and teeth development.</p>
                    <div className="sources-list">
                      <h4>Best Sources:</h4>
                      <ul>
                        <li>Dairy products</li>
                        <li>Spinach</li>
                        <li>Salmon</li>
                        <li>Broccoli</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="nutrition-card">
                  <div className="nutrition-icon">☀️</div>
                  <h3>Vitamin D</h3>
                  <div className="nutrition-content">
                    <p>Promotes bone strength and teeth development.</p>
                    <div className="sources-list">
                      <h4>Best Sources:</h4>
                      <ul>
                        <li>Fortified milk</li>
                        <li>Orange juice</li>
                        <li>Fish</li>
                        <li>Eggs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="nutrition-card">
                  <div className="nutrition-icon">🍖</div>
                  <h3>Iron</h3>
                  <div className="nutrition-content">
                    <p>Essential for blood production and oxygen supply.</p>
                    <div className="sources-list">
                      <h4>Best Sources:</h4>
                      <ul>
                        <li>Lean red meat</li>
                        <li>Poultry</li>
                        <li>Fish</li>
                        <li>Iron-fortified foods</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card-wrapper">
            <div className="info-card-header warning-header">
              <FaExclamationTriangle className="info-icon" />
              <h2>Important Precautions</h2>
            </div>
            <div className="info-card-content">
              <div className="precautions-grid">
                <div className="precaution-card">
                  <h3>Foods to Avoid</h3>
                  <div className="precaution-list">
                    <div className="precaution-item">
                      <span className="precaution-icon">🍣</span>
                      <p>Raw or undercooked seafood</p>
                    </div>
                    <div className="precaution-item">
                      <span className="precaution-icon">🐟</span>
                      <p>High-mercury fish</p>
                    </div>
                    <div className="precaution-item">
                      <span className="precaution-icon">🥩</span>
                      <p>Undercooked meat</p>
                    </div>
                    <div className="precaution-item">
                      <span className="precaution-icon">🥛</span>
                      <p>Unpasteurized dairy</p>
                    </div>
                  </div>
                </div>

                <div className="precaution-card">
                  <h3>Lifestyle Changes</h3>
                  <div className="precaution-list">
                    <div className="precaution-item">
                      <span className="precaution-icon">🚭</span>
                      <p>No smoking</p>
                    </div>
                    <div className="precaution-item">
                      <span className="precaution-icon">🍷</span>
                      <p>No alcohol</p>
                    </div>
                    <div className="precaution-item">
                      <span className="precaution-icon">☕</span>
                      <p>Limit caffeine</p>
                    </div>
                    <div className="precaution-item">
                      <span className="precaution-icon">💊</span>
                      <p>Consult before taking medications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyWeightGainCalculator;
