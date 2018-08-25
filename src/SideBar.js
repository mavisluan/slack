import React from 'react'

const SideBar = ({ channels, people, onChannelSelect, onPersonSelect, activeName }) => (
    <div className='side-bar'>  
        <div className='bar-control'>
            <h4>CHANNELS</h4>
            {channels.map(channel => (
                <div 
                    className={`${ activeName === channel.name && 'selected'}`} 
                    key={channel.id} 
                    onClick={()=> onChannelSelect(channel)}>
                    # {channel.name}
                </div>
            ))}
            </div>
        <div className='bar-control'>
            <h4>PEOPLE</h4>
            {people.map(person => (
                <div 
                    className={`${activeName === person.name && 'selected'}`}
                    key={person.id} 
                    onClick={()=> onPersonSelect(person)}>
                    {person.name}
                </div>
            ))}
        </div>
    </div>
)

export default SideBar