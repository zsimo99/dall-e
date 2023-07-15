import {Link} from "react-router-dom"
import {logo} from "../assets"
const Header = () => {
  return (
    <header className='w-full flex justify-between items-center bg-white sm:px-8 py-4 px-4 border-b m-auto border-b-[#e6ebf5]'>
        <Link to="/">
            <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create" className="font-inter font-medium bg-[#6469ff] px-4 p-2 rounded-md text-white">Create
        </Link>
    </header>
  )
}

export default Header