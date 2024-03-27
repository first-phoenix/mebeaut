import { createChatBotMessage } from 'react-chatbot-kit'

const config = {
  initialMessages: [createChatBotMessage(`Hello, you can ask me anything from foundations to skin problems!`)],
  botName: '',
  customComponents: {
    botAvatar: (props) => <img className = "w-12 h-12 rounded-full" src = "./assets/bot/avatar.png" {...props} />
  }
}

export default config