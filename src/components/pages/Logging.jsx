import { useState } from "react"
import useWorkoutStore from "../stores/workoutStore";
import './logWorkout.css'
import { FaSearch } from "react-icons/fa";
import { FaDumbbell, FaRedoAlt, FaWeightHanging, FaCalendarAlt } from 'react-icons/fa';

const Logging = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [exercise, setExercise] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [error, setError] = useState("");
    const [exerciseData, setExerciseData] = useState([]);

    // Zustand action to add a new workout
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const workoutEntries = useWorkoutStore((state) => state.workoutEntries);

    const fetchData = async () => {
        if(searchTerm.trim()=== 'true') {
            setError('please input an exercise')
            return
        } setError ('');

        try {
            const response = await fetch(`https://wger.de/api/v2/exercise/?s=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            if(data.Response=== 'true'){
                setExerciseData(data.searchTerm);
            } else{
                setError(data.Error);
                setExerciseData([]);
            }

            
        } catch(error) {
            console.error('error fetching data', error);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (sets <= 0 || reps <= 0 || weight <= 0) {
            alert("Please select positive numbers only");
            return;
          }

        const newWorkout = {
            exercise: searchTerm || exercise,
            sets,
            reps,
            weight,
            timestamp: new Date().toLocaleString(),
        }

        addWorkout(newWorkout);

        // Save to local storage
        const storedWorkouts = JSON.parse(localStorage.getItem('workoutEntries')) || [];
        localStorage.setItem('workoutEntries', JSON.stringify([...storedWorkouts, newWorkout]));

        setExercise('');
        setSets(0);
        setReps(0);
        setWeight(0);
    }

  return (
    <div className="bg-workout-bg bg-cover bg-center min-h-screen flex flex-col justify-center items-center p-5">
      <div className="glass w-full sm:w-3/4 md:w-1/2 lg:w-2/4 p-8 rounded-lg shadow-lg flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full space-y-6 animate-fadeIn flex flex-col items-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5">Log Workout</h1>

                    {/* exercise search field */}
                    <div className="flex items-center border border-gray-300 rounded-full p-2">
                        <FaSearch className="text-gray-500 mr-2"/>
                        <input type="text" value={searchTerm} onChange={e=>{setSearchTerm(e.target.value)}} placeholder="Search for exercises" 
                        className="flex-1 outline-none bg-transparent placeholder-babypink text-gray-700" />
                        <button onClick={fetchData}>Search</button>

                        <div>
                            {error&& <p>{error}</p>}
                            {!error && (
                                <div>
                                    {exerciseData.map((fitness)=>(
                                        <div key={fitness.id}>
                                            <p>{fitness.description}</p>
                                            <p>{fitness.muscle}</p>
                                            <p>{fitness.sets}</p>
                                            <p>{fitness.reps}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                    </div>
                    

                    {/* manual exercise input */}
                    <div className="w-full">
                    <label htmlFor="exercise" className="text-white font-semibold">Input Exercise</label>
                    <input 
                    type="text"
                    name="exercise"
                    placeholder="manually input exercise here"
                    value={exercise}
                    onChange={(e)=>{setExercise(e.target.value)}}
                    className="border-2 border-white rounded-xl w-full bg-transparent text-babypink px-3 py-2 placeholder-babypink" />
                    </div>

                    {/* Input fieilds for sets, reps and weights*/}
                    <div className="w-full">
                    <label htmlFor="sets" className="text-white font-semibold">Sets:</label>
                    <input 
                    type="number"
                    name="sets"
                    value={sets}
                    onChange={(e)=>{setSets(parseInt(e.target.value))}} 
                    className="border-2 border-white rounded-xl w-full bg-transparent text-babypink px-3 py-2"/>
                    </div>

                    <div className="w-full">
                    <label htmlFor="reps" className="text-white font-semibold">Reps:</label>
                    <input 
                    type="number"
                    name="reps"
                    
                    value={reps}
                    onChange={(e)=>{setReps(parseInt(e.target.value))}}
                    className="border-2 border-white rounded-xl w-full bg-transparent text-babypink px-3 py-2"/>
                    </div>

                    <div className="w-full">
                    <label htmlFor="weight" className="text-white font-semibold">Weight:</label>
                    <input 
                    type="number"
                    name="weight"
                   
                    value={weight}
                    onChange={(e)=>{setWeight(parseInt(e.target.value))}}
                    className="border-2 border-white rounded-xl w-full bg-transparent text-babypink px-3 py-2 " />
                    </div>

                    <button type="submit" className="w-full bg-pink text-white hover:bg-white hover:text-pink px-3 py-2 rounded-xl">Log Workout</button>
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
  )
}

export default Logging
