import { useContext, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { AppContext } from '../context/store'

function Uploader() {
  const [image, setImage] = useState(null)
  const imageRef = useRef()

  const { setUserPhoto } = useContext(AppContext)
  const navigate = useNavigate()


  const createImageURL = () => {
    if (imageRef.current.files.length > 0) {
        setImage(URL.createObjectURL(imageRef.current.files[0]))
    }
  }

  if(image) {
    console.log(image)
  }

  const loadLook = () => {
    setUserPhoto(image)
    navigate('/tryon')
  }

  return (
    <div>
        <input type="file" accept="image/*" ref = { imageRef } onChange = { createImageURL } />
        { image && <img src = { image } /> }
        { image && <button onClick = { loadLook }>Apply Some Magic</button> }
    </div>
  )
}

export default Uploader