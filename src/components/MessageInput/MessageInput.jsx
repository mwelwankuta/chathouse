import React, { useEffect, useState } from 'react'
import {ReplyIcon} from '@heroicons/react/outline'
import { func, string, any } from 'prop-types'
import './style.css'

function MessageInput({username, setTyping, socket, sendMessage}) {
    const [textInput, setTextInput] = useState('')
    const setText = (e) => {
        e.preventDefault()
        sendMessage(textInput)
        setTextInput('')
        socket.emit('typing', {isTyping: false, username: username})
        setTyping({ username: username, isTyping: false })
    }

    useEffect(() => {
      console.log('textinput length: ', textInput.split('').length)
      if(textInput.split('').length < 2){
        setTyping({ username: username, isTyping: false })
        socket.emit('typing', {isTyping: false, username: username})
      }
    }, [textInput, setTyping, username, socket])
    return (
        <form className="message-input" onSubmit={(e) => setText(e)}>
          <input multiple aria-multiline placeholder="message" onChange={(e) => {
            setTextInput(e.target.value)
            socket.emit('typing', {isTyping: true, username: username})
          }} value={textInput}/>
          {textInput.length > 0 && 
          <button type="submit">
            <ReplyIcon height="20px"/>
          </button>}

          {textInput.length === 0 && 
          <button type="submit" className="disabled">
            <ReplyIcon height="20px"/>
          </button>}
        </form>
    )
}

MessageInput.propTypes = {
  username: string,
  setTyping: func,
  socket: any,
  sendMessage: func
}

export default MessageInput

