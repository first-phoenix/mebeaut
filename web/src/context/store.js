import { createContext, useState } from 'react'
import data from '../data/looks.json'

export const AppContext = createContext()

const ProviderWrapper = ({ children }) => {
    const [look, setLook] = useState(data[0])
    const [parameter, setParameter] = useState('foundation')
    
    return (
        <AppContext.Provider value = {{ look, setLook, parameter, setParameter }}>
            { children }
        </AppContext.Provider>
    )
}
 
export default ProviderWrapper