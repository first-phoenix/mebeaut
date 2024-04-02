import { useContext } from 'react'
import { AppContext } from '../context/store'

export default function Tooltip({ style, shade, setParameter }) {
    const { parameter } = useContext(AppContext)

    //let classProp = parameter === style ? 'w-8 h-8 scale-125 z-99' : 'w-8 h-8' 

    return (
        <div className = "group relative">
            <div className = "w-8 h-8" onClick = { () => setParameter(style) } style = {{ backgroundColor: shade }}></div>
            <div className = " absolute top-3 left-[14%]  hidden group-hover:block">
                <div className = "bottom-full rounded bg-black text-[0.5rem] text-white px-2 py-1">{ style.charAt(0).toUpperCase() + style.slice(1) }</div>
            </div>
        </div>
    )
}