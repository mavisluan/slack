import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar'
import MessageInput from './MessageInput'
import Messages from './Messages'
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
    // when press 'enter', get e.target.value --- the text 
    // call handleSendMessage to add the new message to state.data
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
      return (
        <div className='select-reminder'>
          Please select a channel or user from the left.
        </div>
      )
    } 

    //choose messages array respectively when a channel or a user is selected
    let messages = []

    if (selectedChannelId) {
      messages = channelsData[selectedChannelId]
    }

    if (selectedPersonId) {
      messages = peopleData[selectedPersonId]
    }


    if (messages.length === 0 ) {
    // show empty reminder if no message
      return (
          <div>
              <div className='empty-reminder'>
                  No message.
                  <br/>
                  Why not add some messages?
              </div>
              <MessageInput onAddMessage={this.addMessage}/>
          </div>
      )
    } else {
    // show messages if there are messages
      return (
        <Messages messages={messages}>
          <MessageInput onAddMessage={this.addMessage}/>
        </Messages>
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
