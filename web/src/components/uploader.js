import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fileToBase64 } from 'file64'
import Sparkles from 'react-sparkle'
import { AppContext } from '../context/store'

function Uploader() {
  const { savePhoto, setInitImg } = useContext(AppContext)
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const imageRef = useRef()

  const createImageURL = async () => {
    if (imageRef.current.files.length > 0) {
      setImage(URL.createObjectURL(imageRef.current.files[0]))

      let temp = await fileToBase64(imageRef.current.files[0])
      
      if(temp) {
        setInitImg(temp)
      }
    }
  }

  const loadLook = () => {
    savePhoto(image)
    navigate('/tryon')
  }

  return (
    <div className='font-bold text-xl'>
      <input type = "file" accept = "image/*" ref = { imageRef } onChange = { createImageURL } />
      { image && <img src = { image } /> }
      { 
        image && <span onClick = { loadLook }>Apply some magic!</span>
      }
    </div>
  )
}

export default Uploader