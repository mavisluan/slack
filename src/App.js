import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar'
import ChannelMessages from './ChannelMessages'
import PersonMessages from './PersonMessages'
import { channels, people, createFakeActivity } from './static-data'

class App extends Component {
  state = {
    MessagesByChannelId: [],
    MessagesByPersonId: []
  }

  handleChannelSelection = (id) => {
    const channelsMessages = createFakeActivity(channels, 12)
    this.setState({
      MessagesByChannelId: channelsMessages[id],
      MessagesByPersonId: [] 
    })
  }

  handlePersonSelection = (id) => {
    const peopleMessages = createFakeActivity(people, 6)
    this.setState({
      MessagesByPersonId: peopleMessages[id],
      MessagesByChannelId: []
    })
  }

  render() {
    const { MessagesByChannelId, MessagesByPersonId } = this.state
    return (
      <div className="app">
        <SideBar 
          channels={channels} 
          people={people}
          onChannelSelect={this.handleChannelSelection}
          onPersonSelect={this.handlePersonSelection}
        />        
        <div className='board'>
          <ChannelMessages messages={MessagesByChannelId}/>
          <PersonMessages messages={MessagesByPersonId} />
        </div>
      </div>
    );
  }
}

export default App;
