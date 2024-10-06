import  { useState } from 'react';
import useWorkoutStore from '../stores/workoutStore';


const WorkoutCard = ({ workout }) => {
  const workoutEntries = useWorkoutStore((state) => state.workoutEntries);
    
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-4 ">
      {/* Card header showing workout date and a summary */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-black">{workout.exercise}</h3>
          <p className="text-sm text-gray-500">Logged on: {workout.timestamp}</p>
        </div>
        <button
          className="text-blue-500 underline"
          onClick={toggleExpand}
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {/* If the card is expanded, show workout details */}
      {isExpanded && (
        <div className="mt-4">
          <p><strong>Sets:</strong> {workout.sets}</p>
          <p><strong>Reps:</strong> {workout.reps}</p>
          <p><strong>Weight:</strong> {workout.weight} kg</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;