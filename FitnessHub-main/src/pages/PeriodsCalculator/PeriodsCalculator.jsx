import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './PeriodsCalculator.css';
import React from 'react';
import { FaFemale, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const PeriodsCalculator = () => {
  const [lastPeriod, setLastPeriod] = useState(new Date());
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(28);
  const [showResults, setShowResults] = useState(false);

  const getThreeMonths = () => {
    const months = [];
    const startDate = new Date(lastPeriod);

    for (let i = 0; i < 3; i++) {
      const currentDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
      months.push({
        month: currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
        dates: Array.from(
          { length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() },
          (_, index) => new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1)
        )
      });
    }
    return months;
  };

  const calculatePeriodDates = () => {
    const months = getThreeMonths();
    let currentPeriodStart = new Date(lastPeriod);
    const allPeriodDates = [];
    const allOvulationDates = [];

    // Calculate for 4 cycles to ensure coverage
    for (let i = 0; i < 4; i++) {
      // Period dates
      for (let j = 0; j < periodLength; j++) {
        const periodDate = new Date(currentPeriodStart);
        periodDate.setDate(currentPeriodStart.getDate() + j);
        allPeriodDates.push(periodDate.toISOString().split('T')[0]);
      }

      // Calculate ovulation dates (14 days before next period)
      const nextPeriodStart = new Date(currentPeriodStart);
      nextPeriodStart.setDate(currentPeriodStart.getDate() + cycleLength);
      
      const ovulationStart = new Date(nextPeriodStart);
      ovulationStart.setDate(nextPeriodStart.getDate() - 14); // 14 days before next period
      
      // Calculate 5 fertile days (2 days before and 2 days after ovulation)
      for (let k = -2; k <= 2; k++) {
        const ovulationDate = new Date(ovulationStart);
        ovulationDate.setDate(ovulationStart.getDate() + k);
        allOvulationDates.push(ovulationDate.toISOString().split('T')[0]);
      }

      // Move to next cycle
      currentPeriodStart = nextPeriodStart;
    }

    return months.map(month => ({
      ...month,
      periodDates: allPeriodDates,
      ovulationDates: allOvulationDates
    }));
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const getDateClass = (date, monthData) => {
    const dateStr = date.toISOString().split('T')[0];
    if (monthData.periodDates.includes(dateStr)) return 'period-day';
    if (monthData.ovulationDates.includes(dateStr)) return 'ovulation-day';
    return '';
  };

  return (
    <div className="periods-calculator">
      <h1>Periods Calculator</h1>
      
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
          <label>How long does your period last? (days)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={periodLength}
            onChange={(e) => setPeriodLength(parseInt(e.target.value))}
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
        <div className="results">
          <div className="calendar-grid">
            {calculatePeriodDates().map((monthData, index) => (
              <div key={index} className="month-calendar">
                <h3>{monthData.month}</h3>
                <div className="calendar">
                  <div className="calendar-header">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="calendar-day-header">{day}</div>
                    ))}
                  </div>
                  <div className="calendar-body">
                    {Array(monthData.dates[0].getDay()).fill(null).map((_, i) => (
                      <div key={`empty-${i}`} className="calendar-day empty"></div>
                    ))}
                    {monthData.dates.map((date, i) => (
                      <div
                        key={i}
                        className={`calendar-day ${getDateClass(date, monthData)}`}
                      >
                        {date.getDate()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-color period-day"></div>
              <span>Period Days</span>
            </div>
            <div className="legend-item">
              <div className="legend-color ovulation-day"></div>
              <span>Fertile Days</span>
            </div>
          </div>
        </div>
      )}

      <div className="menstrual-info-section">
        <div className="info-card-wrapper">
          <div className="info-card-header cycle-header">
            <FaFemale className="info-icon" />
            <h2>Understanding Your Menstrual Cycle</h2>
          </div>
          
          <div className="info-card-content">
            <div className="cycle-intro">
              <div className="intro-card">
                <FaChartLine className="intro-icon" />
                <p className="featured-text">
                  The menstrual cycle is a natural monthly process that prepares your body for potential pregnancy. 
                  It typically begins between ages 12-15 and continues until menopause (around age 52).
                </p>
              </div>
            </div>

            <div className="cycle-stats">
              <div className="stat-card">
                <div className="stat-number">28</div>
                <p>Average Days in Cycle</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">2-7</div>
                <p>Days of Period</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">8</div>
                <p>Max Days Variation</p>
              </div>
            </div>

            <div className="cycle-phases">
              <h3>Phases of the Menstrual Cycle</h3>
              <div className="phases-grid">
                <div className="phase-card">
                  <div className="phase-icon">🌸</div>
                  <h4>Menstrual Phase</h4>
                  <ul className="phase-details">
                    <li>Regular discharge of blood</li>
                    <li>Release of mucosal tissue</li>
                    <li>Lasts 2-7 days</li>
                    <li>Marks cycle day 1</li>
                  </ul>
                </div>

                <div className="phase-card">
                  <div className="phase-icon">🌱</div>
                  <h4>Follicular Phase</h4>
                  <ul className="phase-details">
                    <li>Uterine lining thickens</li>
                    <li>Egg development begins</li>
                    <li>Hormone levels rise</li>
                    <li>Prepares for ovulation</li>
                  </ul>
                </div>

                <div className="phase-card">
                  <div className="phase-icon">🥚</div>
                  <h4>Ovulation Phase</h4>
                  <ul className="phase-details">
                    <li>Egg release from ovary</li>
                    <li>Most fertile period</li>
                    <li>Occurs mid-cycle</li>
                    <li>Lasts 24-48 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cycle-timeline">
              <h3>Typical 28-Day Cycle Timeline</h3>
              <div className="timeline">
                <div className="timeline-marker start">
                  <span className="day">Day 1</span>
                  <span className="event">Period Starts</span>
                </div>
                <div className="timeline-marker fertile">
                  <span className="day">Days 12-17</span>
                  <span className="event">Fertile Window</span>
                </div>
                <div className="timeline-marker ovulation">
                  <span className="day">Day 14</span>
                  <span className="event">Ovulation</span>
                </div>
                <div className="timeline-marker end">
                  <span className="day">Day 28</span>
                  <span className="event">Cycle Ends</span>
                </div>
              </div>
            </div>

            <div className="key-facts">
              <h3>Important Facts to Remember</h3>
              <div className="facts-grid">
                <div className="fact-card">
                  <FaCalendarAlt className="fact-icon" />
                  <h4>Regular Cycles</h4>
                  <p>Vary by less than 8 days between longest and shortest cycles</p>
                </div>
                <div className="fact-card">
                  <span className="fact-icon">🤰</span>
                  <h4>During Pregnancy</h4>
                  <p>Periods stop throughout pregnancy</p>
                </div>
                <div className="fact-card">
                  <span className="fact-icon">👶</span>
                  <h4>Breastfeeding</h4>
                  <p>May pause during early stages of breastfeeding</p>
                </div>
                <div className="fact-card">
                  <span className="fact-icon">⏳</span>
                  <h4>Menopause</h4>
                  <p>Periods end permanently around age 49-52</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodsCalculator; 