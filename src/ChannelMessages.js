import React from 'react'

const ChannelMessages = ({ messages }) => (
    <div>
        {messages.map( message => (
            <div className='message-info' key={message.id}>
                <div className='image'></div>
                <div className='message'>
                    <div>
                    <span style={{fontWeight: 'bold', marginRight:'10px'}}>   
                        {message.userName}
                    </span> 
                    <span style={{color: 'darkgray'}}>
                        {message.timestamp.toString()}
                    </span>
                    </div>
                    <div>{message.text}</div>
                </div>
            </div>
        ))} 
    </div>       
)

export default ChannelMessages