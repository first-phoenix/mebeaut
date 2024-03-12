import { useContext, useState } from 'react'
import { AppContext } from '../context/store'
import shadeCatalogue from '../data/db.json'

export default function ShadePicker() {
  const { look, setLook, parameter } = useContext(AppContext)

  const changePalette = (item) => {
    let temp = look

    for(var key in temp.products) {
      if(key === parameter) {
        temp.products[key] = item
      }
    }

    setLook({ ...temp })
  }
  
  return (
    <div className = "bg-white bg-opacity-50 flex flex-col items-center gap-6 rounded-lg py-6 my-6">
      <h2 className = "text-dark font-semibold text-[1.25rem]">{ parameter.charAt(0).toUpperCase() + parameter.slice(1) }</h2>
      <ul className = "grid grid-cols-5 gap-4 px-6">
        {
          shadeCatalogue[parameter].map((item, index) => {
            let styleClass = look.products[parameter].shadeHex == item.shadeHex ? "border-gray-500" : "border-white"

            return ( <li key = { index } onClick = { () => changePalette(item) }>
              <span className = { "block p-1 border-2 " + styleClass + " hover:border-gray-500 rounded-full transition ease-in duration-300" }>
                <span className = "block w-12 h-12 rounded-full" style = {{ backgroundColor: item.shadeHex }}></span>
              </span>
            </li>)
          })
        }
      </ul>
    </div>
  )
}