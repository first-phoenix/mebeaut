import { createContext, useEffect, useState } from 'react'
import data from '../data/looks.json'

export const AppContext = createContext()

const ProviderWrapper = ({ children }) => {
    const [look, setLook] = useState(data[0])
    const [parameter, setParameter] = useState('foundation')
    const [initImg, setInitImg] = useState(null)
    const [userPhoto, setUserPhoto] = useState(null)

    useEffect(() => {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify({ 'image':initImg })
        })
    }, [initImg])
    
    useEffect(() => {
        const data = {
            'foundation': hexToRgb(look.products.foundation.shadeHex),
            'concealer': hexToRgb(look.products.concealer.shadeHex),
            'blush': hexToRgb(look.products.blush.shadeHex),
            'eyeliner': hexToRgb(look.products.eyeliner.shadeHex),
            'lipstick': hexToRgb(look.products.lipstick.shadeHex),
        }

        fetch('/makeup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()
        ).then((data) => {
            console.log(data)
            setUserPhoto(data.image)
        })
    }, [userPhoto, look])

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
    }
    
    return (
        <AppContext.Provider value = {{ look, setLook, setInitImg, userPhoto, setUserPhoto, parameter, setParameter }}>
            { children }
        </AppContext.Provider>
    )
}
 
export default ProviderWrapper