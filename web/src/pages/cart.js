
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/store'
import { FaTrashAlt } from 'react-icons/fa'
 
function Cart() {
  const { userPhoto, cartProds } = useContext(AppContext)
  const navigate = useNavigate()
 
  useEffect(() => {
    if(!userPhoto) {
      navigate('/')
    }
  }, [userPhoto, navigate])
 
  return (
    <div className = "bg-gradient-to-r from-[#1a0816] via-[#411d3adc] to-[#1a0816] h-screen"> 
    <section section className="flex flex-col px-56 py-40">
  
      {/* Tabled contents for cart items */}
      <table className = "table-auto bg-[#ebe7e7] bg-opacity-40">
        <thead className = " bg-[#ecf0ed] border-2 border-black ">
         <tr className=' align-middle'>
          <th>ITEM</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th></th>
         </tr>
        </thead>
        <tbody className = "">
          {
            cartProds && cartProds.map((item, index) => {
              return (
                <tr key = { index } className = " border-2 border-black ">
                  <td className = " align-middle w-[50%] h-auto ">
                    <div className = " flex ">
                    <img className = " ml-6 w-[80px] h-[110px]" src = { item.image } />
                    <div className = "ml-24 grid grid-row-2 justify-center">
                      <p className = "text-xl font-bold">{ item.name }</p>
                      <p className = "text-l font-semibold text-[#0b0a0a]">Palette: { item.shadeCode }</p>
                    </div>
                    </div>
                  </td>
                  <td className = "mx-auto font-semibold text-center">Rs.{ item.price }</td>
                  <td className = "align-middle">
                  <div className = "flex items-center justify-center">
                    <div className = "flex h-8 w-8 cursor-text font-semibold items-center justify-center border-t border-b active:ring-white">
                      1
                    </div>
                  </div>
                  </td>
                  <td className = " align-middle">
                    <FaTrashAlt className = "m-0 h-5 w-5 cursor-pointer" />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
       
    </section>
    </div>
  )
}
 
export default Cart