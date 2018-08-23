import React from 'react'

const SideBar = ({ channels, people, onChannelSelect }) => (
    <div className='side-bar'>  
        <div className='bar-control'>
            <h4>CHANNELS</h4>
            {channels.map(channel => (
                <div onClick={()=> onChannelSelect(channel.id)}key={channel.id}># {channel.name}</div>
            ))}
            </div>
        <div className='bar-control'>
            <h4>PEOPLE</h4>
            {people.map(person => (
                <div key={person.id}># {person.name}</div>
            ))}
        </div>
    </div>
)

export default SideBar