import { useContext, useState } from 'react'
import Modal from 'react-modal'
import { AppContext } from '../context/store'
import Tooltip from '../utils/tooltip'
import { LuPlus } from 'react-icons/lu'
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io'
 
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
    textAlign: "end",
    width: 600
  }
}
 
export default function ShadePalette() {
  const { look, setParameter, cartProds, addToCart, deleteItem } = useContext(AppContext)
 
  const [open, setOpen] = useState(false)
  const [tut, setTut] = useState(false)
  
  return (
    <div className = "absolute bottom-2 right-[6%]">
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
                <div key = { index } className = "grid grid-cols-4 border-black border-b-2 py-2 items-center text-xs font-cust4 gap-6 my-2">
                  <img className = "h-12 w-8" src = { look.products[keyName].image } />
                  <div className = "flex flex-row justify-between">
                    { look.products[keyName].name }
                    <br/>
                    { look.products[keyName].shadeCode }
                  </div>
                  <div className = "flex flex-row justify-between">
                    Rs. { look.products[keyName].price }
                  </div>
                  {
                    cartProds.includes(look.products[keyName]) ? <button className='items-center' onClick = { () => deleteItem(look.products[keyName]) }><IoMdRemoveCircle size={22}/></button> 
                    : <button className='items-center' onClick = { () => addToCart(look.products[keyName]) }><IoMdAddCircle size={22}/></button>
                  }
                </div>                            
              )
            })
          }
          <button className = "bg-black text-white text-xs w-fit rounded-md py-2 px-6 m-8" onClick = { setTut }>Watch Tutorial</button>
          <Modal isOpen = { tut } onRequestClose = { () => setTut(false) } style = { customStyles }> 
            <video width = "200" height = "150" controls>
              <source src = "./assets/tutorials/how_to_do.mp4" type = "video/mp4" />
            </video>
          </Modal>
        </Modal>
      </div>
    </div>
  )
}