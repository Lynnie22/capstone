import { useState } from 'react';
import useWorkoutStore from '../stores/workoutStore';
import WorkoutCard from '../common/WorkoutCard';



const WorkoutHistory = () => {
  const workoutEntries = useWorkoutStore((state) => state.workoutEntries);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to group workouts by date (YYYY-MM-DD)
  const groupWorkoutsByDate = (workouts) => {
    return workouts.reduce((acc, workout) => {
      // Extract only the date part from the timestamp
      const workoutDate = new Date(workout.timestamp).toLocaleDateString();

      if (!acc[workoutDate]) {
        acc[workoutDate] = [];
      }
      acc[workoutDate].push(workout);

      return acc;
    }, {});
  };

  // Get the grouped workouts by date
  const groupedWorkouts = groupWorkoutsByDate(workoutEntries);

  // Handle search term input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter workouts by exercise name or date
  const filteredWorkouts = Object.keys(groupedWorkouts).filter((date) =>
    date.includes(searchTerm) ||
    groupedWorkouts[date].some((workout) =>
      workout.exercise.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="workout-history">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>

      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded-md w-full"
          placeholder="Search by exercise or date"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Display grouped workouts */}
      {filteredWorkouts.length === 0 ? (
        <p>No workouts found. Try logging some workouts or adjust your search.</p>
      ) : (
        <div className="space-y-4">
          {filteredWorkouts.map((date, index) => (
            <div key={index} className="p-4 mb-4  text-black rounded-xl shadow-xl border-2 border-pink">
              <h3 className="text-xl font-semibold mb-2">{date}</h3>
              {groupedWorkouts[date].map((workout, workoutIndex) => (
                <WorkoutCard key={workoutIndex} workout={workout} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;


