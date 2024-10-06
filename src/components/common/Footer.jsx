
import Logo from './Logo'
import Navlinks from './Navlink'

const Footer = () => {
  return (
    <div className='bg-pink flex flex-col gap-5 md:flex md:justify-between'>
      <Logo/>
      <Navlinks/>
    </div>
  )
}

export default Footer
