import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar'
import { channels, people, createFakeActivity } from './static-data'

class App extends Component {
  state = {
    MessagesByChannelId: [],
    MessagesByPersonId: []
  }

  handleChannelSelection = (id) => {
    const channelsMessages = createFakeActivity(channels, 12)
    this.setState({
      MessagesByChannelId: channelsMessages[id] 
    })
  }

  render() {
    return (
      <div className="app">
        <SideBar 
          channels={channels} 
          people={people}
          onChannelSelect={this.handleChannelSelection}
        />        
        <div className='board'>
          {this.state.MessagesByChannelId.map( message => (
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
      </div>
    );
  }
}

export default App;
