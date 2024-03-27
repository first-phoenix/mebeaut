import { FaCameraRetro, FaFileUpload } from 'react-icons/fa'
import Carousel from '../components/carousel'
import CustomCapture from '../components/capture'
import CustomModal from '../utils/modal'
import FileUploader from '../components/uploader'
 
function Home() {   
  return (
    <div className = "relative">
      <Carousel />
      <div className = "flex absolute bottom-12 left-1/2 flex-row gap-8">
        <CustomModal icon = { <FaCameraRetro size={35} /> } action = { <CustomCapture /> } />
        <CustomModal icon = { <FaFileUpload size={35}/> } action = { <FileUploader /> } />
      </div>
    </div>
  )
}
 
export default Home