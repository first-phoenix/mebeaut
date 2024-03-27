import React from 'react'

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.length > 5) {
      actions.handleQuery(message.toLowerCase())
    }
  }

  return (
    <>
      { React.Children.map(children, (child) => React.cloneElement(child, { parse: parse, actions }))}
    </>
  )
}

export default MessageParser