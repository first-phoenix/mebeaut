import { FaCameraRetro, FaFileUpload } from "react-icons/fa"
import CustomWebcam from '../components/webcam'
import MyModal from '../components/modal'
import Uploader from "../components/uploader"

const customStyles = {
    'background': 'url("./assets/home.jpg") no-repeat center',
    'min-height': '100vh',
    'background-size': 'cover',
    'position': 'relative'
}

function Home() {  
  return (
    <div style = { customStyles } className = "flex flex-col items-center justify-center gap-12 h-screen">
      <p className = "bg-gray-200 bg-opacity-55 rounded-lg text-center text-sm px-6 py-12">
        <h5 className = "font-bold text-xl mb-6">CRAFTING BEAUTY: Your Makeup, Your Rules!</h5> 
        Empower your beauty journey with our platform – where confidence meets innovation.
        <br />
        Discover personalized tips,connect with beauty experts, and celebrate your unique glow.
        Unleash your radiance effortlessly with us.
      </p>
      <div className = "flex flex-row gap-6">
        <MyModal icon = { <FaCameraRetro /> } action = { <CustomWebcam /> } />
        <MyModal icon = { <FaFileUpload /> } action = { <Uploader /> } />
      </div>
    </div> 
  )
}

export default Home