import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css'

import ChatHeader from './components/ChatHeader/ChatHeader'
import MessageInput from './components/MessageInput/MessageInput'
import MessageList from './components/MessageList/MessageList'

let socket;
let SOCKET_CONNECTION = 'chathouse-backend.herokuapp.com/'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  
  const [room, setRoom] = useState('')
  const [username, setUsername] = useState('')

  const [allChatMessages, setAllChatMessages] = useState([])

  const [typing, setTyping] = useState({isTyping: false, username: ''})

  useEffect(() => {
    // connections user
    socket = io(SOCKET_CONNECTION)
    socket.emit('connection')

  }, [])

  const connectToRoom = (e) => {
    e.preventDefault()
    //joing room 

    socket.emit('join_room', { room, username } )
      setLoggedIn(true)
  }


  useEffect(() => {
    // recieveing message
    socket.on('recieve_message', (message) => {
      const newAllChatMessages = [...allChatMessages, { message: message.message, username: message.username }]
      setAllChatMessages(newAllChatMessages)
    })
  }, [allChatMessages])

  useEffect(() => {
    socket.on('typing', (data) => {
      setTyping({username: data.username, isTyping: data.isTyping})
    })
  }, [typing.isTyping])


  const sendMessage = (text) => {
      //sending messages
      socket.emit('message', { message: text, username: username })

      const newMyChatMessage = [...allChatMessages, { message: text, username: username }]
      setAllChatMessages(newMyChatMessage)
  }

  return (
    <>    
      {!loggedIn && 
        <div className='login-page'>
          <div className="card">
            <h1>ChatHouse</h1>
            <p>start chatting easily</p>
            <form className="connect-form" onSubmit={e => connectToRoom(e)}>
              <input placeholder="Room..." onChange={(e) => setRoom(e.target.value)} />
              <input placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
              <button type="submit">Joing Room</button>
            </form>
          </div>
        </div> 
      }

      {loggedIn && 
        <div className="message-page">
          <ChatHeader
            roomname={room}
            typing={typing} 
            username={username}/>
            
          <MessageList 
            allChatMessages={allChatMessages} 
            username={username}/>

          <div>
            <MessageInput 
              socket={socket} 
              username={username} 
              setTyping={setTyping} 
              sendMessage={sendMessage} />
          </div>
        </div>
      }
    </>
  )

}

export default App;
