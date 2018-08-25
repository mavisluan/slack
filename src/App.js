import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { channels, people, createFakeActivity } from './static-data'


function nextId(messages) {
  // if the 'messages' array is empty, the nextId is 0
  // if the 'messages' array is not empty, the nextId is the last item's id plus 1.
  return messages.length ? messages[messages.length - 1].id + 1 : 0
}

function createMessage(text, messageId) {
  return {
    id: messageId,
    userName: 'Myself',
    text: text,
    timestamp: new Date()
  };
}


class App extends Component {
  state = {
    channelsData: createFakeActivity(channels, 12),
    peopleData: createFakeActivity(people, 6),
    selectedChannelId: null,
    selectedPersonId: null,
    activeName: '',
  }


  handleChannelSelection = (channel) => {
    const { id, name } = channel
    this.setState({
      selectedChannelId: id,
      seletedPersonId: null,
      activeName: name
    })
  }

  handlePersonSelection = (person) => {
    const { id, name } = person
    this.setState({
      selectedPersonId: id,
      selectedChannelId: null,
      activeName: name
    })
  }

  addMessage = (e) => {
    if (e.key === 'Enter') {
        const text = e.target.value
        this.handleAddMessage(text)
        e.target.value=''
    }
  }

  handleAddMessage = (text) => { 
      const { selectedChannelId, selectedPersonId, channelsData, peopleData } = this.state

      if (selectedChannelId) {
        const id = nextId(channelsData[selectedChannelId])
        const message = createMessage(text, id)
        this.setState({
          ...this.state,
          channelsData:  {
            ...channelsData,
            [selectedChannelId]: [...channelsData[selectedChannelId], message]
          }
        })
      }
      
      if (selectedPersonId) {
        const id = nextId(peopleData[selectedPersonId])
        const message = createMessage(text, id)
        this.setState({
          ...this.state,
          peopleData:  {
            ...peopleData,
            [selectedPersonId]: [...peopleData[selectedPersonId], message]
          }
        })
      }
  }

  renderMessages = ( ) => {
    const { selectedChannelId, selectedPersonId, peopleData, channelsData } = this.state
    
    if (selectedChannelId) {
      return (
        <Messages messages={channelsData[selectedChannelId]} >
          <MessageInput onAddMessage={this.addMessage}/>
        </Messages>
      )
    } 
   
    if (selectedPersonId) {
      return (
        <Messages messages={peopleData[selectedPersonId]}>
          <MessageInput onAddMessage={this.addMessage}/>
        </Messages >
      )
    } 
    
    else {
      return (
        <div className='select-reminder'>
          Please select a channel or person from the left.
        </div>
      )
    }
  }
  render() {
    const { activeName } = this.state

    return (
      <div className="app">
        <SideBar 
          channels={channels} 
          people={people}
          onChannelSelect={this.handleChannelSelection}
          onPersonSelect={this.handlePersonSelection}
          activeName={activeName}
        />
        <div className='board'>
          {this.renderMessages()}    
        </div>
      </div>
    );
  }
}

export default App;
