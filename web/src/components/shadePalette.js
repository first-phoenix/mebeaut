import { useContext, useState } from 'react'
import { AppContext } from '../context/store'
import Tooltip from '../utils/tooltip'
import { LuPlus } from "react-icons/lu"

export default function ShadePalette({ setSelected }) {
    const { look, setParameter } = useContext(AppContext)

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
                <div className = "bg-white absolute rounded-full -top-3 -right-3 p-1">
                    <LuPlus />
                </div>
            </div>
        </div>
    )
}