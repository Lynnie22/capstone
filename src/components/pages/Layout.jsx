import { Outlet } from "react-router-dom"
import Nav from "../common/Nav"
const Layout = () => {
  return (
    <div className="w-full h-full p-5 ">
        <Nav/>
        <Outlet/>
    </div>
  )
}

export default Layout
