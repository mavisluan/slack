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

  renderMessages = ( ) => {
    const { activeButton, MessagesByChannelId, MessagesByPersonId } = this.state
    // let messages;
    // if (channels.find(channel => channel.name === activeButton)) {
    //   messages = MessagesByChannelId
    // }
    // if (people.find(person => person.name === activeButton)) {
    //   messages = MessagesByPersonId
    // }  
    if (!activeButton) {
      return (
        <div className='select-reminder'>
          Please selecte a channel or user from left.
        </div>
      )
    } else {
      return (
        <div className='board'>
          <ChannelMessages messages={MessagesByChannelId} />
          <PersonMessages messages={MessagesByPersonId} />
          <input type='text' />
        </div>
      )
    }
  }
  render() {
    const { activeButton } = this.state

    return (
      <div className="app">
        <SideBar 
          channels={channels} 
          people={people}
          onChannelSelect={this.handleChannelSelection}
          onPersonSelect={this.handlePersonSelection}
          activeButton={activeButton}
        />
          {this.renderMessages()}
        
      </div>
    );
  }
}

export default App;
