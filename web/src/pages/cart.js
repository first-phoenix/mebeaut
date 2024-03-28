
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/store'
import Modal from 'react-modal'
import { FaTrashAlt } from 'react-icons/fa'
 
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

function Cart() {
  const { userPhoto, cartProds, deleteItem } = useContext(AppContext)
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
 
  useEffect(() => {
    if(!userPhoto) {
      navigate('/')
    }
  }, [userPhoto, navigate])
 
  return (
    <section section className = "flex flex-col px-56 py-12">
      {/* Tabled contents for cart items */}
      <table className = "table-auto border-separate border-spacing-6">
        {
          cartProds.length > 0 && <thead className = "bg-[#ecf0ed]">
            <tr className = "align-middle">
              <th>ITEM</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
        }
        <tbody>
          {
            cartProds.length > 0 && cartProds.map((item, index) => {
              return (
                <tr key = { index }>
                  <td className = "align-middle w-[50%] h-auto">
                    <div className = "flex ">
                    <img className = "ml-6 w-[80px] h-[110px]" src = { item.image } />
                    <div className = "ml-24 grid grid-row-2 justify-center">
                      <p className = "text-xl font-bold">{ item.name }</p>
                      <p className = "text-l font-semibold text-[#0b0a0a]">Palette: { item.shadeCode }</p>
                    </div>
                    </div>
                  </td>
                  <td className = "mx-auto font-semibold text-center">Rs.{ item.price }</td>
                  <td className = "align-middle text-center">
                    <FaTrashAlt className = "m-0 h-5 w-5 cursor-pointer" onClick = { () => deleteItem(item) } />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      { 
        cartProds.length > 0 && <div className = "flex flex-row items-center">
          <button className = "bg-black text-white w-fit rounded-md py-2 px-6 m-8" onClick = { setOpen }>Watch Tutorial</button>
          <button className = "bg-black text-white w-fit rounded-md py-2 px-6">Place Order</button>
        </div>
      }
      <Modal isOpen = { open } onRequestClose = { () => setOpen(false) } style = { customStyles }> 
        <video width = "300" height = "200" controls>
          <source src = "./assets/tutorials/how_to_do.mp4" type = "video/mp4" />
        </video>
      </Modal>
    </section>
  )
}
 
export default Cart