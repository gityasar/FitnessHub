import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ExercisesList.css'; // You can style the exercise cards here

const ExercisesList = () => {
  const { bodyPart } = useParams(); // Get the body part from the URL
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '40c5526a22mshadecf3687054b3ep1f00b3jsnb941f35fc819',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setExercises(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setLoading(false);
      }
    };

    fetchExercises();
  }, [bodyPart]);

  return (
    <div className="exercises-list">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="exercise-cards">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <img src={exercise.gifUrl} alt={exercise.name} />
              <h3>{exercise.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExercisesList;
