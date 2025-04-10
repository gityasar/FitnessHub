import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaYinYang, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import './Yoga.css';

const Yoga = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://yoga-api-nzy4.onrender.com/v1/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load yoga categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch poses for selected category
  const fetchPoses = async (categoryId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://yoga-api-nzy4.onrender.com/v1/categories/?id=${categoryId}`);
      setPoses(response.data.poses);
      setSelectedCategory(response.data.category_name);
    } catch (err) {
      setError('Failed to load yoga poses');
    }
    setLoading(false);
  };

  if (error) {
    return <div className="yoga-error">{error}</div>;
  }

  return (
    <div className="yoga-container">
      <header className="yoga-header">
        <FaYinYang className="yoga-icon" />
        <h1>Learn Yoga/Meditation</h1>
      </header>

      {loading && !selectedCategory ? (
        <div className="loading">
          <FaSpinner className="spinner" />
          <p>Loading categories...</p>
        </div>
      ) : (
        <>
          {!selectedCategory ? (
            <div className="categories-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="category-card"
                  onClick={() => fetchPoses(category.id)}
                >
                  <div className="category-content">
                    <h2>{category.category_name}</h2>
                    <p>{category.category_description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="poses-section">
              <div className="poses-header">
                <div className="header-title">
                  <h2>{selectedCategory} Poses</h2>
                  <div className="category-pill">{poses.length} poses</div>
                </div>
                <button 
                  // className="back-button"
                  onClick={() => {
                    setSelectedCategory(null);
                    setPoses([]);
                  }}
                >
                  <FaArrowLeft className="back-icon" />
                  Back
                </button>
              </div>

              {loading ? (
                <div className="loading">
                  <FaSpinner className="spinner" />
                  <p>Loading poses...</p>
                </div>
              ) : (
                <div className="poses-grid">
                  {poses.map((pose) => (
                    <div key={pose.id} className="pose-card">
                      <div className="pose-image">
                        <img src={pose.url_png} alt={pose.english_name} />
                      </div>
                      <div className="pose-content">
                        {/* <h3>{pose.english_name}</h3> */}
                        <h4>{pose.sanskrit_name_adapted}</h4>
                        {/* <p>{pose.pose_description}</p> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Yoga;