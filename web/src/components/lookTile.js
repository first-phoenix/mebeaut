import { useContext, useState } from 'react'
import { AppContext } from '../context/store'
import { FaStar } from "react-icons/fa"

export default function LookTile({ item }) {
  const { setLook } = useContext(AppContext)
  
  return (
    <div className = "bg-white bg-opacity-50 flex flex-col text-center rounded-lg h-fit p-4" onClick = { () => setLook(item) }>
      <div className = "rounded-lg mb-4">
        <img className = "rounded-full h-24 w-24" src = { item.asset } />
      </div>
      <div className = "flex flex-row items-center justify-between">
        <span className = "block font-medium text-sm"><FaStar /></span>
          <h2 className = "text-dark font-semibold text-[1.25rem]">{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }</h2>
      </div>
    </div> 
  )
}