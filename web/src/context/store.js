import { createContext, useEffect, useState } from 'react'
import CallModel from '../hooks/api'
import data from '../data/looks.json'

export const AppContext = createContext()

const ProviderWrapper = ({ children }) => {
    const [look, setLook] = useState(data[0])
    const [parameter, setParameter] = useState('foundation')
    const [userPhoto, setUserPhoto] = useState(null)

    useEffect(() => {
        setUserPhoto(CallModel(look.products, userPhoto))
    }, [userPhoto, look])
    
    return (
        <AppContext.Provider value = {{ look, setLook, userPhoto, setUserPhoto, parameter, setParameter }}>
            { children }
        </AppContext.Provider>
    )
}
 
export default ProviderWrapper