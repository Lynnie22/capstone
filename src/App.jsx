import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";
// import LogWorkout from "./components/pages/LogWorkout";
import WorkoutHistory from "./components/pages/WorkoutHistory";
import Tracking from "./components/pages/Tracking";
import Logging from "./components/pages/Logging";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
      path:"/",
      element: <Home/>,
      index: true,
    },
    {
      path: "/logworkout",
      element: <Logging/>,
    },
    {
      path: "/history",
      element: <WorkoutHistory/>,
    },
    {
      path: "/tracking",
      element: <Tracking/>,
    },
  ]
  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
