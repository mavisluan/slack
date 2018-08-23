import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar'
import { channels, people, createFakeActivity } from './static-data'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar channels={channels} people={people}/>
        <div className='board'></div>
      </div>
    );
  }
}

export default App;
