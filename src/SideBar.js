import React from 'react'

const SideBar = ({ channels, people, onChannelSelect, onPersonSelect, selectedChannelId, selectedPersonId }) => (
    <div className='side-bar'>  
        <div className='bar-control'>
            <h4>CHANNELS</h4>
            {channels.map(channel => (
                <div 
                    className={`${ selectedChannelId === channel.id && 'selected'}`} 
                    key={channel.id} 
                    onClick={()=> onChannelSelect(channel.id)}>
                    # {channel.name}
                </div>
            ))}
            </div>
        <div className='bar-control'>
            <h4>PEOPLE</h4>
            {people.map(person => (
                <div 
                    className={`${selectedPersonId === person.id && 'selected'}`}
                    key={person.id} 
                    onClick={()=> onPersonSelect(person.id)}>
                    {person.name}
                </div>
            ))}
        </div>
    </div>
)

export default SideBar