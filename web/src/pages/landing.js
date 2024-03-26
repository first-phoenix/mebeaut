import { FaCameraRetro, FaFileUpload } from 'react-icons/fa'
import CustomCapture from '../components/capture'
import CustomModal from '../utils/modal'
import FileUploader from '../components/uploader'
 
// Styles for the landing backdrop image
const customStyles = {
  'background': 'url("./assets/home.jpg") no-repeat center',
  'min-height': '100vh',
  'background-size': 'cover',
  'position': 'relative'
}
 
function Home() {   
  return (


    <div style = { customStyles } className = "flex flex-col items-center justify-center gap-4 pt-32 h-screen  ">
      
      <p className = " bg-[#111111] bg-opacity-55 rounded-lg font-cust3 text-center text-2xl px-4 py-4 text-white">
      <div className='flex justify-center items-center h-72'><img src='/logoo.png' className=' w-80 h-80'></img></div>
      < span className = " tracking-wider font-cust2 text-3xl mb-3 line-clamp-3 font-display">CRAFTING BEAUTY: Your Makeup, Your Rules!</span>
        Empower your beauty journey with our platform – where confidence meets innovation.
        <br />
        Discover personalized tips,connect with beauty experts, and celebrate your unique glow.
        Unleash your radiance effortlessly with us.
        <br/>
        <br/>
        <br/>
        <br/>
      </p>
      <div className = "flex flex-row gap-8 ">
        <CustomModal icon = { <FaCameraRetro size={35} /> } action = { <CustomCapture /> } />
        <CustomModal icon = { <FaFileUpload size={35}/> } action = { <FileUploader /> } />
      </div>
    </div>
  )
}
 
export default Home