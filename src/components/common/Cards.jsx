import { Link } from "react-router-dom"

const Cards = () => {
  return (
    <div className='relative grid h-96 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-5 my-7'>
      <div className="relative rounded-3xl bg-babypink shadow-xl transition-all duration-100 ease-in hover:-translate-y-2  hover:drop-shadow-xl ">
        
        <Link to="logworkout" className=" absolute bottom-4 left-4 font-bold text-pink text-2xl">Log Workout</Link>
 
      </div>

      <div className=" relative rounded-3xl bg-babypink  shadow-xl transition-all duration-100 ease-in hover:-translate-y-2  hover:drop-shadow-xl ">
      
        <Link to="/tracking" className=" absolute bottom-4 left-4 font-bold text-pink text-2xl">Workout Tracking</Link>
      
      </div>
    </div>
  )
}

export default Cards
