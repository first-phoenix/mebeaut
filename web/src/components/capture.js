import { useContext, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam'
import Sparkles from 'react-sparkle'
import { AppContext } from '../context/store'
 
const CustomCapture = () => {
  const { setInitImg, savePhoto } = useContext(AppContext)
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
    savePhoto(imageSrc)
    navigate('/tryon')
  }
 
  return (
    <>
      { imageSrc ? <img src = { imageSrc } /> : <Webcam height="900" width = '900' ref = { webcamRef } />}
      <div className = "flex flex-col font-bold items-start text-xl my-8">
        { imageSrc ? <button onClick = { retake }>Retake photo</button> : <button onClick = { captureImage }>Capture photo</button> }<br/>
        { 
          imageSrc && <span onClick = { loadLook }>Apply some magic!</span>
        }
      </div>
    </>
  )
}
 
export default CustomCapture