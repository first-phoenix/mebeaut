import { useLocation } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'

export default function Navbar() {
    const location = useLocation()

    return (
        <nav className = "bg-[#1D1823] flex flex-row items-center justify-between h-[10vh] round py-2 px-16">
            <img src="./assets/logo.png" className = "h-16 w-24" />
            { 
                location.pathname === '/tryon' && <div className = "flex flex-row items-center">
                    <div class = "flex flex-row relative items-center mr-6">
                        <input type = "text" class = "rounded-lg w-[17rem] h-[2.7rem] py-4 px-6" />
                        <CiSearch class = "absolute text-lg right-4" />
                    </div>
                    <a href = '/cart' class = "relative text-white text-4xl mr-6">
                        <IoCartOutline />
                        <span className = "absolute bg-red-400 -top-2 -right-2 text-sm rounded-full px-2">3</span>
                    </a>
                </div>
            }
            {
                location.pathname === '/' && <div>
                    <span className = "btn_nav">Log In</span>
                    <span className = "btn_nav">Sign Up</span>
                </div>
            }
        </nav>
    )
}