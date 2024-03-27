import React from 'react'
import data from '../../data/questions.json'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleQuery = (text) => {
    let flag = []
    let words = text.split(' ')

    for(var i = 0; i < data.length; i++) {
      let question = data[i].question.toLowerCase().replaceAll(' ', '')   
      let match = 0

      for(var j = 0; j < words.length; j++) {
        if(question.includes(words[j])) {
          match++
        }
      }

      flag.push(match)
    }

    let botMessage = createChatBotMessage(data[flag.indexOf(Math.max(...flag))].answer)

    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }))
  }

  return (
    <>
      { React.Children.map(children, (child) => React.cloneElement(child, { actions: { handleQuery }}))}
    </>
  )
}

export default ActionProvider