import { useContext, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { AppContext } from '../context/store'

const CustomCapture = () => {
  const { setUserPhoto } = useContext(AppContext)
  const navigate = useNavigate()

  const webcamRef = useRef(null)
  const [imageSrc, setImageSrc] = useState(null)

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImageSrc(imageSrc)
  }, [webcamRef])

  const retake = () => {
    setImageSrc(null)
  }

  const loadLook = () => {
    setUserPhoto(imageSrc)
    navigate('/tryon')
  }

  return (
    <div className = "">
      { imageSrc ? <img src = { imageSrc } /> : <Webcam height = '600' width = '600' ref = { webcamRef } />}
      <div className = "">
        { imageSrc ? <button onClick = { retake }>Retake photo</button> : <button onClick = { captureImage }>Capture photo</button> }
        { imageSrc && <button onClick = { loadLook }>Apply some magic!</button> }
      </div>
    </div>
  )
}

export default CustomCapture