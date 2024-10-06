
const Motivation = () => {
  return (
    <div className="h-96 w-full flex justify-center gap-56 bg-gradient-to-br from-babypink  to-pink rounded-xl ">
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-6xl font-extrabold text-pink">
            Strong.<br/>
            Confident.<br/>
            Unstoppable.
        </h2>
        <p className="text-xl font-medium text-white">Every Rep is a Step Towards 
        the Best Version of You.</p>
      </div>

      <div>
        <img src="/src/assets/motivation.png" alt="" className="h-full object-cover" />
      </div>
    </div>
  )
}

export default Motivation
