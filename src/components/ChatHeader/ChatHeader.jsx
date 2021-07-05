import React from 'react'
import {string, object} from 'prop-types'

import './style.css'

function ChatHeader({username, roomname, typing}) {
    return (
        <div className="chat-header">
            <h2>{roomname.toLocaleUpperCase()}</h2>
            <div className="typing-status">
                <small>{   
                    typing.isTyping === true &&  
                    typing.username && 
                    typing.username !== username &&
                    `${typing.username} is typing`} 
                </small>
            </div>
        </div>
    )
}

ChatHeader.propTypes = {
    username: string,
    roomname: string,
    typing: object
}

export default ChatHeader

