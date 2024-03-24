import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/store'
import Navbar from '../utils/navbar'
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
  }, [userPhoto, navigate])
 
  return (
    <div className = "bg-gradient-to-r from-[#1a0816] via-[#411d3adc] to-[#1a0816]  h-screen p-12">
      <Navbar />
      <div className = "flex flex-row gap-8">
        <div className = "absolute left-40 top-[20%] bottom-[5%] right-[57%] overflow-hidden">
           <div className = "relative">
            {/* User's picture from webcam */}
            <img className = "rounded-md" src = { userPhoto } />
            {/* The product range for selected look */}
            <ShadePalette />
          </div>
          {/* Catalogue of products for current selection */}
          { parameter !== '' && <ShadePicker /> }
        </div>
        <div className = "grid grid-cols-2 absolute left-[50%] top-[20%] bottom-0 right-12 overflow-y-auto gap-9">
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