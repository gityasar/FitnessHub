import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ConceptionCalculator.css';
import { FaHeart, FaBaby, FaCalendarCheck, FaThermometerHalf, FaWater, FaRegLightbulb, FaRegClock, FaRegChartBar, FaRegHeart, FaHeartbeat } from 'react-icons/fa';

const ConceptionCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState(new Date());
  const [cycleLength, setCycleLength] = useState(28);
  const [showResults, setShowResults] = useState(false);

  const calculateDates = () => {
    // Clone the last period date to avoid modifying the original
    const periodDate = new Date(lastPeriod);
    
    // Calculate ovulation day (typically 14 days before next period)
    const ovulationDate = new Date(periodDate);
    ovulationDate.setDate(periodDate.getDate() + cycleLength - 14);
    
    // Calculate ovulation window (5 days before ovulation and ovulation day)
    const ovulationWindowStart = new Date(ovulationDate);
    ovulationWindowStart.setDate(ovulationDate.getDate() - 5);
    
    // Calculate best intercourse days (3 days before ovulation and ovulation day)
    const bestDaysStart = new Date(ovulationDate);
    bestDaysStart.setDate(ovulationDate.getDate() - 3);
    
    // Calculate pregnancy test date (first day of missed period)
    const testDate = new Date(periodDate);
    testDate.setDate(periodDate.getDate() + cycleLength);
    
    // Calculate next period start
    const nextPeriod = new Date(periodDate);
    nextPeriod.setDate(periodDate.getDate() + cycleLength);
    
    // Calculate due date (280 days from last period)
    const dueDate = new Date(periodDate);
    dueDate.setDate(periodDate.getDate() + 280);

    return {
      conceptionDays: {
        start: formatDate(bestDaysStart),
        end: formatDate(ovulationDate)
      },
      ovulationWindow: {
        start: formatDate(ovulationWindowStart),
        end: formatDate(ovulationDate)
      },
      bestDays: {
        start: formatDate(bestDaysStart),
        end: formatDate(ovulationDate)
      },
      pregnancyTest: formatDate(testDate),
      nextPeriod: formatDate(nextPeriod),
      dueDate: formatDate(dueDate)
    };
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const results = showResults ? calculateDates() : null;

  return (
    <div className="conception-calculator">
      <h1>Conception Calculator</h1>
      
      <div className="calculator-form">
        <div className="input-group">
          <label>First day of your last period</label>
          <Calendar
            onChange={setLastPeriod}
            value={lastPeriod}
            maxDate={new Date()}
            className="custom-calendar"
            navigationLabel={({ date }) => 
              date.toLocaleString('default', { month: 'long', year: 'numeric' })
            }
          />
        </div>

        <div className="input-group">
          <label>Average length of cycle (days)</label>
          <input
            type="number"
            min="22"
            max="44"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
          />
        </div>

        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {showResults && (
        <div className="results-container">
          <div className="results-grid">
            <div className="result-card">
              <div className="card-header">
                <h3>Most Probable Conception Days</h3>
                <span className="icon">👶</span>
              </div>
              <p>{results.conceptionDays.start} to {results.conceptionDays.end}</p>
            </div>

            <div className="result-card">
              <div className="card-header">
                <h3>Ovulation Window</h3>
                <span className="icon">🌸</span>
              </div>
              <p>{results.ovulationWindow.start} to {results.ovulationWindow.end}</p>
            </div>

            <div className="result-card">
              <div className="card-header">
                <h3>Best Intercourse Days</h3>
                <span className="icon">❤️</span>
              </div>
              <p>{results.bestDays.start} to {results.bestDays.end}</p>
            </div>

            <div className="result-card">
              <div className="card-header">
                <h3>Pregnancy Test</h3>
                <span className="icon">🔍</span>
              </div>
              <p>{results.pregnancyTest}</p>
            </div>

            <div className="result-card">
              <div className="card-header">
                <h3>Next Period Start</h3>
                <span className="icon">📅</span>
              </div>
              <p>{results.nextPeriod}</p>
            </div>

            <div className="result-card">
              <div className="card-header">
                <h3>Due Date if Pregnant</h3>
                <span className="icon">🎀</span>
              </div>
              <p>{results.dueDate}</p>
            </div>
          </div>
        </div>
      )}

      <div className="fertility-info-section">
        <div className="info-card-wrapper">
          <div className="info-card-header fertility-header">
            <FaHeart className="info-icon" />
            <h2>Understanding Your Fertile Window</h2>
          </div>

          <div className="info-card-content">
            <div className="fertility-intro">
              <div className="highlight-box">
                <FaBaby className="highlight-icon" />
                <p className="featured-text">
                  The fertile window is a crucial 3-day period when conception probability is highest. 
                  With proper timing and regular intimacy, you can maximize your chances of conception.
                </p>
              </div>
            </div>

            <div className="fertility-timeline">
              <h3>The Conception Timeline</h3>
              <div className="timeline-container">
                <div className="timeline-item">
                  <div className="timeline-icon">🔄</div>
                  <div className="timeline-content">
                    <h4>Sperm Viability</h4>
                    <p>Remains viable for up to 5-7 days inside the body</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon">⭐</div>
                  <div className="timeline-content">
                    <h4>Peak Fertility</h4>
                    <p>Last 3 days of the fertile window</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon">📈</div>
                  <div className="timeline-content">
                    <h4>Success Rate</h4>
                    <p>~30% conception rate during peak days</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="love-section">
              <h3>Love and Childbearing</h3>
              <div className="love-grid">
                <div className="love-card">
                  <FaHeartbeat className="card-icon" />
                  <h4>Regular Intimacy</h4>
                  <p>Aim for 2-3 times per week, regardless of fertility timing</p>
                  <ul className="benefit-list">
                    <li>Prepares body for childbearing</li>
                    <li>Raises hormonal levels</li>
                    <li>Creates favorable conditions</li>
                  </ul>
                </div>

                <div className="love-card">
                  <FaCalendarCheck className="card-icon" />
                  <h4>Optimal Timing</h4>
                  <p>Focus on the days before and during ovulation</p>
                  <ul className="benefit-list">
                    <li>Track your cycle</li>
                    <li>Monitor fertility signs</li>
                    <li>Maintain regular intimacy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="tracking-section">
              <h3>Tracking Your Fertility</h3>
              <div className="tracking-grid">
                <div className="tracking-card">
                  <div className="tracking-header">
                    <FaThermometerHalf className="tracking-icon" />
                    <h4>Basal Body Temperature</h4>
                  </div>
                  <div className="tracking-content">
                    <ul className="tracking-list">
                      <li>Take temperature first thing in morning</li>
                      <li>Pre-ovulation: 97.2°F - 97.7°F</li>
                      <li>Post-ovulation: Rises 0.5°F - 1.0°F</li>
                      <li>Use a basal thermometer for accuracy</li>
                    </ul>
                  </div>
                </div>

                <div className="tracking-card">
                  <div className="tracking-header">
                    <FaWater className="tracking-icon" />
                    <h4>Cervical Mucus</h4>
                  </div>
                  <div className="tracking-content">
                    <ul className="tracking-list">
                      <li>Post-period: Typically dry</li>
                      <li>Pre-ovulation: Cloudy and sticky</li>
                      <li>During fertility: Clear and slippery</li>
                      <li>Similar to egg white consistency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="tips-section">
              <h3>Expert Tips</h3>
              <div className="tips-grid">
                <div className="tip-card">
                  <FaRegLightbulb className="tip-icon" />
                  <h4>Stay Relaxed</h4>
                  <p>Don`t let tracking become stressful. Regular intimacy is key.</p>
                </div>
                <div className="tip-card">
                  <FaRegClock className="tip-icon" />
                  <h4>Be Consistent</h4>
                  <p>Take measurements at the same time each day.</p>
                </div>
                <div className="tip-card">
                  <FaRegChartBar className="tip-icon" />
                  <h4>Track Patterns</h4>
                  <p>Look for your personal biological patterns over months.</p>
                </div>
                <div className="tip-card">
                  <FaRegHeart className="tip-icon" />
                  <h4>Follow Feelings</h4>
                  <p>Listen to your body and maintain a loving relationship.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptionCalculator;
