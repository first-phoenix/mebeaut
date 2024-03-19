import { FaCameraRetro, FaFileUpload } from 'react-icons/fa'
import CustomCapture from '../components/capture'
import CustomModal from '../components/modal'
import FileUploader from '../components/uploader'

import { useContext, useState } from 'react'
import { AppContext } from '../context/store'

const customStyles = {
    'background': 'url("./assets/home.jpg") no-repeat center',
    'min-height': '100vh',
    'background-size': 'cover',
    'position': 'relative'
}

function Home() {  
  const { products } = useContext(AppContext)

  console.log(products)

  return (
    <div style = { customStyles } className = "flex flex-col items-center justify-center gap-12 h-screen">
      <p className = "bg-gray-200 bg-opacity-55 rounded-lg text-center text-sm px-6 py-12">
        <span className = "font-bold text-xl mb-6">CRAFTING BEAUTY: Your Makeup, Your Rules!</span> 
        Empower your beauty journey with our platform – where confidence meets innovation.
        <br />
        Discover personalized tips,connect with beauty experts, and celebrate your unique glow.
        Unleash your radiance effortlessly with us.
      </p>
      <div className = "flex flex-row gap-6">
        <CustomModal icon = { <FaCameraRetro /> } action = { <CustomCapture /> } />
        <CustomModal icon = { <FaFileUpload /> } action = { <FileUploader /> } />
      </div>
    </div> 
  )
}

export default Home