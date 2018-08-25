import React from 'react'

const MessageInput = ({ onAddMessage }) => (
    <div className='input-box'>
        <input 
            type='text' 
            placeholder='Type your message here. Press Enter to send.'
            onKeyPress={onAddMessage}
        />
    </div>
)
    
 

export default MessageInput