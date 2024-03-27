import { useContext } from 'react'
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
    <div className = "bg-[#f1ebeb] opacity-90 flex flex-col items-center gap-8 rounded-xl w-[100%] py-8 my-2">
      <h2 className = "text-dark font-semibold text-[1.25rem]">{ parameter.charAt(0).toUpperCase() + parameter.slice(1) }</h2>
      <ul className = "grid grid-cols-5 gap-4 px-6">
        {
          shadeCatalogue[parameter].map((item, index) => {
            let styleClass = look.products[parameter].shadeHex === item.shadeHex ? "border-black" : ""
 
            return ( <li key = { index } onClick = { () => changePalette(item) }>
              <span className = { "block p-1 border-[2.5px] " + styleClass + " hover:border-gray-600 rounded-full transition ease-in duration-200" }>
                <span className = "block w-12 h-12 rounded-full" style = {{ backgroundColor: item.shadeHex }}></span>
              </span>
            </li>)
          })
        }
      </ul>
    </div>
  )
}