import { useState } from 'react'
import Modal from 'react-modal'
 
// Styles for the pop-up
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 600,
    height: 500
  }
}
 
 export default function CustomModal({ icon, action }) {
    const [open, setOpen] = useState(false)
 
    return (
      <>
        <button className = "bg-white rounded-full p-4" onClick = { setOpen }>
          {/* The icon shown on screen */}
          { icon } 
        </button>
        <Modal isOpen = { open } onRequestClose = { () => setOpen(false) } style = { customStyles }>
          {/* Component to handle user interaction */}
          { action }
        </Modal>
      </>
    )
}