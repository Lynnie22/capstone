import { useState } from 'react';
import useWorkoutStore from '../stores/workoutStore';
import './LogWorkout.css';
import { FaDumbbell, FaRedoAlt, FaWeightHanging, FaCalendarAlt } from 'react-icons/fa';
import useExerciseData from '../../hooks/useExerciseData'; // Import the hook

const WorkoutLog = () => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // For searching exercises
  const [selectedExercise, setSelectedExercise] = useState(''); // For exercise selection
  
  // Zustand action to add a new workout
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const workoutEntries = useWorkoutStore((state) => state.workoutEntries);

  // Fetch exercise data using the custom hook
  const { exercises, loading, error } = useExerciseData(searchTerm);

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (sets <= 0 || reps <= 0 || weight <= 0) {
      alert("Please select positive numbers only");
      return;
    }
    const newWorkout = {
      exercise: selectedExercise || exercise, // Use the selected exercise or manual input
      sets,
      reps,
      weight,
      timestamp: new Date().toLocaleString(),
    };
    
    addWorkout(newWorkout);
    
    // Save to local storage
    const storedWorkouts = JSON.parse(localStorage.getItem('workoutEntries')) || [];
    localStorage.setItem('workoutEntries', JSON.stringify([...storedWorkouts, newWorkout]));
    
    setExercise('');
    setSelectedExercise('');
    setSets(0);
    setReps(0);
    setWeight(0);
  };

  return (
    <div className="bg-workout-bg bg-cover bg-center min-h-screen flex flex-col justify-center items-center p-5">
      <div className="glass w-full sm:w-3/4 md:w-1/2 lg:w-2/4 p-8 rounded-lg shadow-lg flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full space-y-6 animate-fadeIn flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5">
            Log Workout
          </h2>

          {/* Search for exercises */}
          <div className="w-full">
            <label className="text-white font-semibold">Search Exercise:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or muscle group"
              className="border-2 border-white rounded-xl w-full bg-transparent text-babypink px-3 py-2 placeholder-babypink"
            />
          </div>

          {/* Display matching exercises only */}
          <div className="w-full">
            {loading && <p className="text-white">Loading exercises...</p>}
            {error && <p className="text-white">Error fetching exercises: {error}</p>}
            {exercises.length > 0 && searchTerm && (
              <ul className="exercise-list">
                {exercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="p-2 text-white cursor-pointer hover:bg-babypink"
                    onClick={() => setSelectedExercise(exercise.name)}
                  >
                    {exercise.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display the selected exercise */}
          {selectedExercise && (
            <div className="w-full">
              <p className="text-white">Selected Exercise: {selectedExercise}</p>
            </div>
          )}

          {/* Manual input for exercise if not selected */}
          <div className="w-full">
            <label className="text-white font-semibold">Or Input an Exercise:</label>
            <input
              type="text"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="Input an Exercise"
              className="border-2 border-white rounded-xl w-full bg-transparent text-babypink px-3 py-2 placeholder-babypink"
            />
          </div>

          {/* Other input fields for sets, reps, and weight */}
          <div className="w-full">
            <label className="text-white font-semibold">Sets:</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(parseInt(e.target.value))}
              required
              className="border-2 border-babypink rounded-xl w-full bg-transparent text-babypink px-3 py-2 placeholder-babypink"
            />
          </div>
          <div className="w-full">
            <label className="text-white font-semibold">Reps:</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(parseInt(e.target.value))}
              required
              className="border-2 border-white rounded-xl w-full bg-transparent text-babypink px-3 py-2 placeholder-babypink"
            />
          </div>
          <div className="w-full">
            <label className="text-white font-semibold">Weight:</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              required
              className="border-2 border-white rounded-xl w-full bg-transparent text-babypink px-3 py-2 placeholder-babypink"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink text-white rounded-xl py-2 hover:bg-babypink hover:text-pink transition duration-300"
          >
            Log Workout
          </button>
        </form>
      </div>

      <div className='glass w-full sm:w-3/4 md:w-1/2 lg:w-2/4 p-8 rounded-lg shadow-lg flex flex-col justify-center items-center mt-6'>
        {workoutEntries.length === 0 ? (
          <p className='text-white'>No workout Logged yet</p> 
        ) : (
          <ul className="space-y-4 w-full">
            {workoutEntries.map((workout, index) => (
              <li 
                key={index} 
                className="p-4 mb-4 bg-stone-500 text-white rounded-xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="flex items-center space-x-4">
                  <FaDumbbell size={20} className="text-babypink" />
                  <span>{workout.exercise}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaRedoAlt size={20} className="text-babypink" />
                  <span>{workout.sets} Sets</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaWeightHanging size={20} className="text-babypink" />
                  <span>{workout.reps} Reps</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaWeightHanging size={20} className="text-babypink" />
                  <span>{workout.weight} kg</span>
                </div>
                <div className="flex items-center space-x-4">
                  <FaCalendarAlt size={20} className="text-babypink" />
                  <span>{workout.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WorkoutLog;
