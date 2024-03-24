import { createContext, useEffect, useState } from 'react'
import data from '../data/looks.json'

export const AppContext = createContext()

const ProviderWrapper = ({ children }) => {
    const [look, setLook] = useState(data[0])
    const [parameter, setParameter] = useState('foundation')
    const [initImg, setInitImg] = useState(null)
    const [userPhoto, setUserPhoto] = useState(JSON.parse(window.sessionStorage.getItem('uploadedPhoto')))
    const [cartProds, setCartProds] = useState(JSON.parse(window.sessionStorage.getItem('prods')) || [])

    // Image stored in server while learning model discovers facial points
    useEffect(() => {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify({ 'image': initImg })
        })
    }, [initImg])
    
    // Send makeup data to server to fetch fitted image
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
            localStorage.setItem('uploadedPhoto', JSON.stringify(data))
            setUserPhoto(data.image)
        })
    }, [look])

    // Using sessions to persist user data across page reloads and browser actions
    function savePhoto(img) {
        window.sessionStorage.setItem('uploadedPhoto', JSON.stringify(img))
        setUserPhoto(img)
    }

    function addToCart(item) {
        let temp = [...cartProds, item]

        setCartProds(temp)
        window.sessionStorage.setItem('prods', JSON.stringify(temp))
    }

    // Regex to convert color vales from hex to rgb
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        
        return {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
    }

    const state = { look, 
      setLook, 
      setInitImg, 
      userPhoto, 
      savePhoto, 
      parameter, 
      setParameter,
      cartProds, 
      addToCart
    }
    
    return (
        <AppContext.Provider value = {{ ...state }}>
            { children }
        </AppContext.Provider>
    )
}
 
export default ProviderWrapper