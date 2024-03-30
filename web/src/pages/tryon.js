import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/store'
import { FaMessage } from 'react-icons/fa6'
import ShadePalette from '../components/shadePalette'
import ShadePicker from '../components/shadePicker'
import LookTile from '../components/lookTile'
import ReactBot from '../utils/bot/reactbot'
import data from '../data/looks.json'
 
function TryOn() {
  const { userPhoto, parameter } = useContext(AppContext)
  const navigate = useNavigate()

  const [show, setShow] = useState(true)

  useEffect(() => {
    if(!userPhoto) {
      navigate('/')
    }
  }, [userPhoto, navigate])
 
  return (
    <div className = " flex flex-row gap-8 ">
      <div className = "absolute top-[18%] left-[8%] overflow-hidden">
        <div className = "relative ">
          {/* User's picture from webcam */}
          <img className = "w-full rounded-md" src = { userPhoto } />
          {/* The product range for selected look */}
          < ShadePalette  />
        </div>
        {/* Catalogue of products for current selection */}
        { parameter !== '' && <ShadePicker /> }
      </div>
      <div className = "grid grid-cols-2 absolute top-[20%] bottom-0 right-[8%] overflow-y-auto gap-9">
      {
        data.map((item, index) => {
            let props = { item }
    
            return <LookTile key = { index } { ...props } />
          })
        }
      </div>
      { show && <ReactBot /> }
      <div className = "bg-black absolute rounded-full bottom-4 right-4 text-2xl text-white p-4">
        <FaMessage onClick = { () => setShow(!show)  } />
      </div>
    </div>
  )
}
 
export default TryOn