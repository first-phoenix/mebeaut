import { useContext, useState } from 'react'
import { AppContext } from './context/store'
import Navbar from './utils/navbar'
import ShadePalette from './components/shadePalette'
import ShadePicker from './components/shadePicker'
import LookTile from './components/lookTile'
import data from './data/looks.json'

function App() {
  const { parameter } = useContext(AppContext)

  return (
    <>
      <Navbar />
      <div className = "flex gap-12">
        <div className = "w-1/3">
          <div className = "relative">
            <img className = "rounded-md" src = "./assets/demo.png" /> 
            <ShadePalette />
          </div>
          { parameter !== '' && <ShadePicker /> } 
        </div>
        <div className = "grow grid grid-cols-3 gap-16 p-6">
          {
            data.map((item, index) => {
              let props = { item }

              return <LookTile key = { index } { ...props } />
            })
          }
        </div>
      </div>
    </>
  )
}

export default App