import { useContext } from 'react'
import { AppContext } from '../context/store'
//import { FaStar } from 'react-icons/fa'
 
export default function LookTile({ item }) {
  const { setLook } = useContext(AppContext)
 
  return (
    <div className = "bg-[#aea4ae9d] hover:bg-white flex flex-shrink justify-between items-center px-10 text-center rounded-lg  p-2" onClick = { () => setLook(item) }>
      <div className = "rounded-lg ">
        <img className = "rounded-full h-28 w-28" src = { item.asset } />
      </div>
      <div className = "flex flex-row items-center justify-between">
        
          <h2 className = "text-dark  font-cust3 font-semibold text-[1.5rem]">{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }</h2>
      </div>
    </div>
  )
}