import { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { AppContext } from '../context/store'
import Navbar from '../components/navbar'
import ShadePalette from '../components/shadePalette'
import ShadePicker from '../components/shadePicker'
import LookTile from '../components/lookTile'
import data from '../data/looks.json'

function TryOn() {
  const { userPhoto, parameter } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(!userPhoto) {
      navigate('/')
    }
  }, [])
  
  return (
    <div className = "bg-gradient-to-r from-slate-900 to-slate-700 h-screen p-12">
      <Navbar />
      <div className = "flex flex-row gap-12">
        <div className = "absolute left-12 top-[20%] bottom-0 right-[67%] overflow-hidden">
           <div className = "relative">
            <img className = "rounded-md" src = { userPhoto } /> 
            <ShadePalette />
          </div>
          { parameter !== '' && <ShadePicker /> } 
        </div>
        <div className = "grid grid-cols-2 absolute left-[38%] top-[20%] bottom-0 right-12 overflow-y-auto gap-8">
          {
            data.map((item, index) => {
              let props = { item }
              return <LookTile key = { index } { ...props } />
            })
          }
        </div>
      </div>
    </div>
  )
}
  
export default TryOn