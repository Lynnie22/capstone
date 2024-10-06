import Cards from "../common/Cards"
import Footer from "../common/Footer"
import Hero from "../common/Hero"
import Motivation from "../common/Motivation"

const Home = () => {
  return (
    <div>
      <Hero 
      heroTitle="Track Your Fitness"
      heroText="Monitor your workouts, track progress, and improve your fitness effortlessly."
      />
      <Cards />
      <Motivation/>
      <Footer/>

    </div>
  )
}

export default Home
