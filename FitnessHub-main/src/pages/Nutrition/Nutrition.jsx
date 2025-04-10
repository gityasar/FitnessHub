import { useState } from "react";
import "./Nutrition.css";
// import nutritionBg from '../../assets/nutrition.png';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Nutrition = () => {
  const [formData, setFormData] = useState({
    goal: "Lose weight",
    dietary_restrictions: "Non-Vegetarian",
    current_weight: "",
    target_weight: "",
    daily_activity_level: "Moderate",
    lang: "en",
  });
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = {
      ...formData,
      dietary_restrictions: [formData.dietary_restrictions],
    };

    const url =
      "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/nutritionAdvice?noqueue=1";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "c6b7207250msh9d196bbe4e4a466p1b0b86jsnd2d448de478b",
        "x-rapidapi-host":
          "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setNutritionPlan(result);
      toast.success("Nutrition plan generated successfully!");
    } catch (err) {
      setError("Failed to get nutrition plan. Please try again." + err);
      toast.error("Failed to get nutrition plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="nutrition-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <motion.div 
        className="nutrition-header"
        variants={itemVariants}
      >
        <h1>Personalized Nutrition Plan</h1>
        <p>Get your customized nutrition plan based on your goals and preferences</p>
      </motion.div>

      <div className="nutrition-content">
        <motion.form 
          onSubmit={handleSubmit} 
          className="nutrition-form"
          variants={itemVariants}
        >
          <div className="form-group">
            <label>Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              required
            >
              <option value="Lose weight">Lose Weight</option>
              <option value="Gain weight">Gain Weight</option>
              <option value="Maintain weight">Maintain Weight</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dietary Restrictions</label>
            <select
              name="dietary_restrictions"
              value={formData.dietary_restrictions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dietary_restrictions: e.target.value,
                }))
              }
              required
            >
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Current Weight (kg)</label>
              <input
                type="number"
                name="current_weight"
                value={formData.current_weight}
                onChange={handleInputChange}
                required
                min="30"
                max="300"
              />
            </div>

            <div className="form-group">
              <label>Target Weight (kg)</label>
              <input
                type="number"
                name="target_weight"
                value={formData.target_weight}
                onChange={handleInputChange}
                required
                min="30"
                max="300"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Activity Level</label>
            <select
              name="daily_activity_level"
              value={formData.daily_activity_level}
              onChange={handleInputChange}
              required
            >
              <option value="Sedentary">Sedentary</option>
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Very Active">Very Active</option>
            </select>
          </div>

          <motion.button 
            type="submit" 
            className="btn-submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              "Get Nutrition Plan"
            )}
          </motion.button>
        </motion.form>

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {error}
          </motion.div>
        )}

        {nutritionPlan && (
          <motion.div 
            className="nutrition-plan"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="plan-header"
              variants={itemVariants}
            >
              <h2>{nutritionPlan.exercise_name || 'Your Nutrition Plan'}</h2>
              <p className="plan-goal">{nutritionPlan.goal}</p>
            </motion.div>

            {nutritionPlan.description && (
              <motion.div 
                className="plan-description"
                variants={itemVariants}
              >
                <p>{nutritionPlan.description}</p>
              </motion.div>
            )}

            <motion.div 
              className="plan-stats"
              variants={containerVariants}
            >
              {nutritionPlan.calories_per_day && (
                <motion.div 
                  className="stat-card"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3>Daily Calories</h3>
                  <p className="calories-value">{nutritionPlan.calories_per_day} kcal</p>
                </motion.div>
              )}

              {nutritionPlan.macronutrients && (
                <motion.div 
                  className="stat-card"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3>Macronutrients</h3>
                  <div className="macro-grid">
                    <div className="macro-item">
                      <span>Carbs</span>
                      <span>
                        {nutritionPlan.macronutrients.carbohydrates || "N/A"}
                      </span>
                    </div>
                    <div className="macro-item">
                      <span>Protein</span>
                      <span>
                        {nutritionPlan.macronutrients.proteins || "N/A"}
                      </span>
                    </div>
                    <div className="macro-item">
                      <span>Fats</span>
                      <span>{nutritionPlan.macronutrients.fats || "N/A"}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {nutritionPlan.meal_suggestions && Array.isArray(nutritionPlan.meal_suggestions) && (
              <motion.div 
                className="meal-suggestions"
                variants={containerVariants}
              >
                <motion.h3 variants={itemVariants}>Meal Suggestions</motion.h3>
                <div className="meals-grid">
                  {nutritionPlan.meal_suggestions.map((mealTime, index) => (
                    <motion.div 
                      key={index} 
                      className="meal-card"
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4>{mealTime.meal}</h4>
                      {mealTime.suggestions && Array.isArray(mealTime.suggestions) && (
                        <div className="suggestions-list">
                          {mealTime.suggestions.map((meal, idx) => (
                            <motion.div 
                              key={idx} 
                              className="suggestion-item"
                              variants={itemVariants}
                            >
                              <h5>{meal.name || "Unnamed Meal"}</h5>
                              <p className="calories">
                                {meal.calories
                                  ? `${meal.calories} calories`
                                  : "Calories not specified"}
                              </p>
                              {meal.ingredients &&
                                meal.ingredients.length > 0 && (
                                  <div className="ingredients">
                                    <h6>Ingredients:</h6>
                                    <ul>
                                      {meal.ingredients.map(
                                        (ingredient, i) => (
                                          <li key={i}>{ingredient}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Nutrition;
