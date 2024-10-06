import { create } from 'zustand';

const useWorkoutStore = create((set) => ({
  workoutEntries: [],

  
  addWorkout: (workout) => set((state) => ({
    workoutEntries: [...state.workoutEntries, workout]
  }))
}));

export default useWorkoutStore;