import { CiSearch } from "react-icons/ci"
import { IoCartOutline } from 'react-icons/io5'

export default function Navbar() {
    return (
        <nav className = "flex flex-row items-center justify-between mb-10">
            <img className = "w-18 h-12" src = './assets/logo_web.png' />
            <div className = "flex flex-row items-center text-2xl">
                <div className = "flex flex-row relative items-center mr-6">
                    <input type = "text" className = "rounded-lg w-[22rem] py-2 px-4" />
                    <CiSearch className = "absolute right-4" />
                </div>
                <a href = "/cart">
                    <IoCartOutline />
                </a>
            </div>
        </nav>
    )
}