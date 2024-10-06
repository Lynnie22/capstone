import Button from "./Button"

const Hero = ({heroTitle, heroText}) => {
  return (
    <div className="relative">
      <img src="/src/assets/woman-training-weightlifting-gym.jpg"  alt=""
       className="rounded-3xl h-1/2 w-full object-cover" />
       <div className="absolute flex flex-col inset-0 justify-center items-center">
                <h1 className="text-8xl font-extrabold text-white">{heroTitle}</h1>
                <p className="text-4xl text-white font-medium">{heroText}</p>
                <Button buttonText="Login"/>
       </div>
    </div>
  )
}

export default Hero
