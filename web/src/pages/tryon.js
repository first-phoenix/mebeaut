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
      <div className = "bg-gradient-to-r from-slate-900 to-slate-700 p-12">
        <Navbar />
        <div className = "flex gap-12">
          <div className = "w-1/3">
            <div className = "relative">
              <img className = "rounded-md" src = { userPhoto } /> 
              <ShadePalette />
            </div>
            { parameter !== '' && <ShadePicker /> } 
          </div>
          <div className = "grow grid grid-cols-3 gap-8 p-6">
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