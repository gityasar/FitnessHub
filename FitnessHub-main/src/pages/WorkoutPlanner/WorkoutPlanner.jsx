import { useState } from "react";
import "./WorkoutPlanner.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkoutPlanner = () => {
  const [formData, setFormData] = useState({
    goal: "Build muscle",
    fitness_level: "Basic",
    preferences: ["Weight training"],
    days_per_week: 4,
    plan_duration_weeks: 4,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        preferences: checked
          ? [...prev.preferences, value]
          : prev.preferences.filter((pref) => pref !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchWorkoutPlan = async () => {
    const url =
      "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/generateWorkoutPlan?noqueue=1";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "c6b7207250msh9d196bbe4e4a466p1b0b86jsnd2d448de478b",
        "x-rapidapi-host":
          "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        health_conditions: ["None"],
        schedule: {
          days_per_week: formData.days_per_week,
          session_duration: 60,
        },
        lang: "en",
      }),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setResult(data);
      toast.success("Nutrition plan generated successfully!");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to get nutrition plan. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="planner-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="planner-title">AI Workout Planner</h1>

      <div className="form-section">
        <div className="form-group">
          <label className="form-label">Goal</label>
          <div className="options-container">
            {["Build muscle", "Lose fat", "Increase stamina"].map((goal) => (
              <label key={goal} className="form-option">
                <input
                  type="radio"
                  name="goal"
                  value={goal}
                  checked={formData.goal === goal}
                  onChange={handleInputChange}
                />
                {goal}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Fitness Level</label>
          <div className="options-container">
            {["Basic", "Intermediate", "Advanced"].map((level) => (
              <label key={level} className="form-option">
                <input
                  type="radio"
                  name="fitness_level"
                  value={level}
                  checked={formData.fitness_level === level}
                  onChange={handleInputChange}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Preferences</label>
          <div className="options-container">
            {["Weight training", "Cardio", "Yoga"].map((preference) => (
              <label key={preference} className="form-option">
                <input
                  type="checkbox"
                  name="preferences"
                  value={preference}
                  checked={formData.preferences.includes(preference)}
                  onChange={handleInputChange}
                />
                {preference}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Days Per Week</label>
          <input
            type="number"
            name="days_per_week"
            value={formData.days_per_week}
            onChange={handleInputChange}
            className="form-input"
            min="1"
            max="7"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Plan Duration (Weeks)</label>
          <input
            type="number"
            name="plan_duration_weeks"
            value={formData.plan_duration_weeks}
            onChange={handleInputChange}
            className="form-input"
            min="1"
            max="12"
          />
        </div>
      </div>
      <button
        onClick={fetchWorkoutPlan}
        className="btn-submit"
        disabled={loading}
      >
        {loading ? <div className="spinner"></div> : "Get Nutrition Plan"}
      </button>
      {/* Result Section */}
      {error && <p className="error-message">{error}</p>}
      {result && (
        <div className="result-card">
          <h2 className="result-title">{result.result.seo_title}</h2>

          <div className="plan-overview">
            <div className="plan-header">
              <h3>Plan Overview</h3>
              <p>
                <strong>Goal:</strong> {result.result.goal}
              </p>
              <p>
                <strong>Fitness Level:</strong> {result.result.fitness_level}
              </p>
              <p>
                <strong>Duration:</strong> {result.result.total_weeks} weeks
              </p>
              <p>
                <strong>Frequency:</strong>{" "}
                {result.result.schedule.days_per_week} days per week
              </p>
              <p className="plan-description">{result.result.seo_content}</p>
            </div>

            <div className="workout-schedule">
              {result.result.exercises.map((dayPlan, index) => (
                <div key={index} className="day-card">
                  <h3 className="day-title">{dayPlan.day}</h3>
                  <div className="exercises-list">
                    {dayPlan.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="exercise-item">
                        <h4 className="exercise-name">{exercise.name}</h4>
                        <div className="exercise-details">
                          <p>
                            <strong>Sets:</strong> {exercise.sets}
                          </p>
                          <p>
                            <strong>Reps:</strong> {exercise.repetitions}
                          </p>
                          <p>
                            <strong>Duration:</strong> {exercise.duration}
                          </p>
                          <p>
                            <strong>Equipment:</strong> {exercise.equipment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="download-button">Download Plan</button>
            <button className="share-button">Share Plan</button>
            <button className="print-button">Print Plan</button>
            <button className="save-button">Save Plan</button>
            <button className="edit-button">Edit Plan</button>
            <button className="delete-button">Delete Plan</button>
          </div>

          <button className="back-button">Back</button>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
