import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar'
import MessageInput from './MessageInput'
import Messages from './Messages'
import SelectReminder from './SelectReminder'
import { channels, people, createFakeActivity } from './static-data'
import { nextId, createMessage } from './input-data'


class App extends Component {
  state = {
    channelsData: createFakeActivity(channels, 12),
    peopleData: createFakeActivity(people, 6),
    selectedChannelId: null,
    selectedPersonId: null,
  }

  handleChannelSelection = (channelId) => (
    this.setState({
      selectedChannelId: channelId,
      selectedPersonId: null
    })
  )

  handlePersonSelection = (personId) => (
    this.setState({
      selectedChannelId: null,
      selectedPersonId: personId
    })
  )

  addMessage = (e) => {
    if (e.key === 'Enter') {
        const text = e.target.value
        this.handleSendMessage(text)
        e.target.value=''
    }
  }

  handleSendMessage = (text) => { 
      const { selectedChannelId, selectedPersonId, channelsData, peopleData } = this.state

      if (selectedChannelId) {
        this.setState({
          ...this.state,
          channelsData: {
            ...channelsData,
            [selectedChannelId]: [...channelsData[selectedChannelId], createMessage(text, nextId(channelsData[selectedChannelId]))]
          }
        })
      }
      
      if (selectedPersonId) {
        this.setState({
          ...this.state,
          peopleData:  {
            ...peopleData,
            [selectedPersonId]: [...peopleData[selectedPersonId], createMessage(text, nextId(peopleData[selectedPersonId]))]
          }
        })
      }
  }

  renderMessages = () => {
    const { channelsData, peopleData, selectedChannelId, selectedPersonId} = this.state
    
    // show reminder if no channels or user is chosen 
    if (!selectedChannelId && !selectedPersonId) {
      return <SelectReminder />
    } else {
    // show selected channel's or user's messages respectively
      const messages = 
      (selectedChannelId) ? channelsData[selectedChannelId] : peopleData[selectedPersonId]
      
      return (
        <div>
          <Messages messages={messages}  />
          <MessageInput onAddMessage={this.addMessage}/>
        </div>
      )
    }
  }
    

  render() {
    const { selectedChannelId, selectedPersonId } = this.state
    
    return (
      <div className="app">
        <SideBar 
          channels={channels} 
          people={people}
          onChannelSelect={this.handleChannelSelection}
          onPersonSelect={this.handlePersonSelection}
          selectedChannelId={selectedChannelId}
          selectedPersonId={selectedPersonId}
        />
        <div className='board'>
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

export default App;
