import { useContext } from 'react'
import { AppContext } from '../context/store'
//import { FaStar } from 'react-icons/fa'
 
export default function LookTile({ item }) {
  const { setLook } = useContext(AppContext)
 
  return (
    <div className = "bg-white opacity-85 hover:shadow-lg hover:bg-[#d2d0d0] flex justify-between items-center px-10 text-center rounded-lg py-6" onClick = { () => setLook(item) }>
      <div className = "rounded-lg ">
        <img className = "rounded-full h-28 w-28" src = { item.asset } />
      </div>
      <div className = "flex flex-row items-center justify-between">
          <h2 className = "text-dark  font-cust3 font-semibold text-[1.5rem]">{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }</h2>
      </div>
    </div>
  )
}