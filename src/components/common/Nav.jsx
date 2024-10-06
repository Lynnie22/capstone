import Logo from "./Logo"
import Navlinks from "./Navlink"


const Nav = () => {
  return (
    <div className="flex justify-between items-center text-center px-5 mb-5">
      <Logo/>
      <Navlinks />
      {/* <Search/> */}
    </div>
  )
}

export default Nav
