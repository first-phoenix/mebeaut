
import { useContext } from 'react'
import { AppContext } from '../context/store'
import { FaStar } from "react-icons/fa"
 
export default function LookTile({ item }) {
  const { setLook } = useContext(AppContext)
 
  return (
    <div className = "bg-[#cbbbc89d] hover:bg-white  flex flex-col text-center rounded-lg h-fit p-2" onClick = { () => setLook(item) }>
      <div className = "rounded-lg mb-2">
        <img className = "rounded-full h-44 w-35" src = { item.asset } />
      </div>
      <div className = "flex flex-row items-center justify-between">
        <span className = "block font-medium text-sm"><FaStar /></span>
          <h2 className = "text-dark font-semibold text-[1.5rem]">{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }</h2>
      </div>
    </div>
  )
}