import { useContext, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import { AppContext } from '../context/store'
 
const CustomCapture = () => {
  const { setInitImg, setUserPhoto } = useContext(AppContext)
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
    setInitImg(imageSrc)
    setUserPhoto(imageSrc)
    navigate('/tryon')
  }
 
  return (
    <div className = "">
      { imageSrc ? <img src = { imageSrc } /> : <Webcam height="900" width = '700' ref = { webcamRef } />}
      <div className = "font-bold text-xl">
        { imageSrc ? <button onClick = { retake }>Retake photo</button> : <button onClick = { captureImage }>Capture photo</button> }<br/>
        { imageSrc && <button onClick = { loadLook }>    Apply some magic!</button> }
      </div>
    </div>
  )
}
 
export default CustomCapture