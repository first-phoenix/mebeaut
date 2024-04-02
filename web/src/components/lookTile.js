import { useContext } from 'react'
import { AppContext } from '../context/store'
import { IoIosTrendingUp } from 'react-icons/io'
 
export default function LookTile({ item }) {
  const { look, setLook } = useContext(AppContext)
 
  const custClass = look.name === item.name ? ' bg-[#d2d0d0] opacity-65' : ' bg-white opacity-85'

  return (
    <div className = { "relative" + custClass + " hover:shadow-lg hover:bg-[#d2d0d0] rounded-lg px-10 py-8" } onClick = { () => setLook(item) }>
      { item.trending && <IoIosTrendingUp className = "absolute top-3 right-4 text-3xl" /> }
      { item.instagram && <img src = "./assets/insta.png" className = "absolute top-3 right-4 w-8 h-8" /> }
      <div className = "flex justify-between items-center">
        <div className = "rounded-lg ">
          <img className = "rounded-full h-24 w-24" src = { item.asset } />
        </div>
        <div className = "flex flex-row items-center justify-between">
          <h2 className = "text-dark  font-cust3 font-semibold text-[1.5rem]">{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }</h2>
        </div>
      </div>
    </div>
  )
}