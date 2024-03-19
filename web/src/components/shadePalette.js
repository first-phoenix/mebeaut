import { useContext, useState } from 'react'
import Modal from "react-modal"
import { AppContext } from '../context/store'
import Tooltip from '../utils/tooltip'
import { LuPlus } from "react-icons/lu"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 600
  }
}

export default function ShadePalette({ setSelected }) {
    const { look, setParameter } = useContext(AppContext)

    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])

    const addToCart = (prod) => {
        setProducts((prev) => [...prev, prod])
        localStorage.setItem('cartProducts', JSON.stringify(products))
    } 
        
    return (
        <div className = "absolute bottom-2 right-4">
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
                <Modal isOpen = { open } onRequestClose = { () => setOpen(false) } style = { customStyles }>                    {
                        Object.keys(look.products).map((keyName, index) => {
                            return (
                                <div key = { index } className = "flex flex-row items-center gap-6">
                                    <img className = "h-16 w-16" src = { look.products[keyName].image } />
                                    <div className = "flex flex-row justify-between">
                                        { look.products[keyName].name }
                                    </div>
                                    <div className = "flex flex-row justify-between">
                                        { look.products[keyName].shadeCode }
                                    </div>
                                    <div className = "flex flex-row justify-between">
                                        Rs. { look.products[keyName].price }
                                    </div>
                                    <button onClick = { () => addToCart(look.products[keyName]) }>ADD</button>

                                    { console.log(products) }
                                </div>
                            )
                        }) 
                    }
                </Modal>
            </div>
        </div>
    )
}