import { useContext, useState } from 'react'
import Modal from 'react-modal'
import { AppContext } from '../context/store'
import Tooltip from '../utils/tooltip'
import { LuPlus } from 'react-icons/lu'
import { IoMdAddCircle } from "react-icons/io";
 
// Styles for the pop-up
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 650
  }
}
 
export default function ShadePalette({ setSelected }) {
  const { look, setParameter, addToCart } = useContext(AppContext)
 
  const [open, setOpen] = useState(false)
  
  return (
    <div className = "absolute bottom-2 right-[4%]">
      <div className = "relative w-fit">
        <div className = "flex flex-col">
          {
            Object.keys(look.products).map((keyName, index) => {
              let shade = look.products[keyName].shadeHex
              let props = { style: keyName, shade, setParameter }
 
              return <Tooltip key = { index } { ...props } />
            })
          }
        </div>
        <button className = "bg-white absolute rounded-full -top-3 -right-3 p-1" onClick = { setOpen }>
          <LuPlus />
        </button>
        <Modal isOpen = { open } onRequestClose = { () => setOpen(false) } style = { customStyles }> 
          {/* Tabled contents for current look product range */}                  
          {
            Object.keys(look.products).map((keyName, index) => {
              return (                         
                <div key = { index } className = "grid grid-cols-4 border-black border-b-2 py-2 items-center font-cust4 gap-6 my-6">
                  <img className = "h-24 w-20" src = { look.products[keyName].image } />
                  <div className = "flex flex-row justify-between">
                    { look.products[keyName].name }
                    <br/>
                    { look.products[keyName].shadeCode }
                  </div>
                  
                  <div className = "flex flex-row justify-between">
                    Rs. { look.products[keyName].price }
                  </div>
                  <button className=' items-center' onClick = { () => addToCart(look.products[keyName]) }><IoMdAddCircle size={32}/></button>
                  
                </div>                            
              )
            })
          }
        </Modal>
      </div>
    </div>
  )
}