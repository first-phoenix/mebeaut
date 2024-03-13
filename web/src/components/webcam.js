import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { AppContext } from '../context/store'
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react" // import useCallback

const CustomWebcam = () => {
  const { setUserPhoto } = useContext(AppContext)
  const navigate = useNavigate()

  const webcamRef = useRef(null)
  const [imgSrc, setImgSrc] = useState(null)

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)

    console.log(imageSrc)
  }, [webcamRef])

  const retake = () => {
    setImgSrc(null)
  }

  const loadLook = () => {
    setUserPhoto(imgSrc)
    navigate('/tryon')
  }

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}

        { imgSrc && <button onClick={ loadLook }>Apply some magic!</button> }
      </div>
    </div>
  )
}

export default CustomWebcam