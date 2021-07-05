import React from 'react'
import { string, array } from 'prop-types'
import './style.css'

function MessageList({allChatMessages, username, }) {
    window.scrollTo(document.querySelector('li'))
    const Messages = allChatMessages.map(msg => 
      <li style={{ justifyContent: msg.username === username ? "flex-end" : "flex-start"}}>
        <div>
            {msg.username !== username && 
              <small>{msg.username}</small>
            }
            <p 
            style={{ 
              color: msg.username === username ? 'white' :'#252525',
              borderColor: msg.username === username ? 'rgba(209, 22, 22, 0.507)' :'#999',
              backgroundColor: msg.username === username ? "#fd4d4d" : "#dedede"
            }}>
              {msg.message}
            </p>
        </div>
      </li>          
    )

    return (
        <ul className="message-list">      
          <ul >
            {Messages}
          </ul>
          {allChatMessages.length === 0 && 
            <div className="no-messages">
              <p>No Messages</p>
            </div>
          }
        </ul>
    )
}

MessageList.propTypes = {
  allChatMessages : array,
  username: string
}

export default MessageList
