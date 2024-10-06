import { NavLink } from "react-router-dom"
const Navlinks = () => {
  return (
    <nav className=" flex gap-5">
        <NavLink 
  to="/" 
  className={({ isActive }) => 
    `transition-all duration-200 ease-in font-medium ${
      isActive 
        ? 'text-pink font-bold ease-in scale-110'  
        : 'text-black'                         
    }`
  }
>
  Home
</NavLink>
<NavLink 
  to="/logworkout" 
  className={({ isActive }) => 
    `transition-all duration-200  ease-in font-medium ${
      isActive 
        ? 'text-pink font-bold ease-in scale-110'  
        : 'text-black'                        
    }`
  }
>
  Log Workout
</NavLink>
<NavLink 
  to="/history" 
  className={({ isActive }) => 
    `transition-all duration-200 ease-in font-medium ${
      isActive 
        ? 'text-pink font-bold ease-in scale-110'  
        : 'text-black'                         
    }`
  }
>
  Workout History
</NavLink>
<NavLink 
  to="/tracking" 
  className={({ isActive }) => 
    `transition-all duration-200 ease-in font-medium ${
      isActive 
        ? 'text-pink font-bold ease-in scale-110'  
        : 'text-black'                         
    }`
  }
>
  Tracking
</NavLink>
    </nav>
  )
}

export default Navlinks
