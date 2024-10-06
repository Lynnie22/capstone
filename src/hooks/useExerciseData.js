import { useState, useEffect } from 'react';
import axios from 'axios';

const useExerciseData = (searchTerm = '') => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm === '') {
      setExercises([]); // Clear exercises if no search term
      return;
    }

    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://wger.de/api/v2/exercise/?search=${searchTerm}`);
        setExercises(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchExercises();
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounceFn); // Cleanup debounce
  }, [searchTerm]);

  return { exercises, loading, error };
};

export default useExerciseData;
