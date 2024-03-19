import { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { AppContext } from '../context/store'
import { FaTrashAlt } from 'react-icons/fa'
import Navbar from '../components/navbar'

function CartPage() {
  const { userPhoto } = useContext(AppContext)
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  // useEffect(() => {
  //   if(!userPhoto) {
  //     navigate('/')
  //   }
  // }, [])

  useEffect(() => {
    console.log(userPhoto)
    console.log(products)
    setProducts(JSON.parse(localStorage.getItem('cartProducts')))
  }, [])
  
  return (
    <table className = "table-fixed">
      <thead className = "h-16 bg-neutral-100">
        <tr>
          <th>ITEM</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
        </tr>
      </thead>
      <tbody className = "">
        {
          products && products.map((item, index) => {
            return (
              <tr key = { index } className = "h-[100px] border-b">
                <td className = "align-middle">
                  <div className = "flex">
                    <img className = "w-[90px]" src = { item.image } />
                    <div className = "ml-3 flex flex-col justify-center">
                      <p className = "text-xl font-bold">{ item.name }</p>
                      <p className = "text-sm text-gray-400">Palette: { item.shadeCode }</p>
                    </div>
                  </div>
                </td>
                <td className = "mx-auto text-center">Rs.{ item.price }</td>
                <td className = "align-middle">
                  <div className = "flex items-center justify-center">
                    <div className = "flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                      1
                    </div>
                  </div>
                </td>
                <td className = "align-middle">
                  <FaTrashAlt className = "m-0 h-5 w-5 cursor-pointer" />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default CartPage