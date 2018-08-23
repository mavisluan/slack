import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar'
import ChannelMessages from './ChannelMessages'
import PersonMessages from './PersonMessages'
import { channels, people, createFakeActivity } from './static-data'

class App extends Component {
  state = {
    MessagesByChannelId: [],
    MessagesByPersonId: [],
    activeButton: ''
  }

  handleChannelSelection = (channel) => {
    const channelsMessages = createFakeActivity(channels, 12)
    const { id, name } = channel
    this.setState({
      MessagesByChannelId: channelsMessages[id],
      MessagesByPersonId: [],
      activeButton: name
    })
  }

  handlePersonSelection = (person) => {
    const peopleMessages = createFakeActivity(people, 6)
    const { id, name } = person
    this.setState({
      MessagesByPersonId: peopleMessages[id],
      MessagesByChannelId: [],
      activeButton: name
    })
  }

  render() {
    const { MessagesByChannelId, MessagesByPersonId, activeButton } = this.state

    return (
      <div className="app">
        <SideBar 
          channels={channels} 
          people={people}
          onChannelSelect={this.handleChannelSelection}
          onPersonSelect={this.handlePersonSelection}
          activeButton={activeButton}
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
