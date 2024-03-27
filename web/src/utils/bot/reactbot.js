import Chatbot from 'react-chatbot-kit'
import config from './config'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import 'react-chatbot-kit/build/main.css'
import './addon.css'

export default function ReactBot() {
    return (
        <>
            <Chatbot config = { config } messageParser = { MessageParser } actionProvider = { ActionProvider } />            
        </>
    )
}