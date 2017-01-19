import React, { Component } from 'react';
import './App.css';
import ChatArea from './ChatArea'


class App extends Component {
  render() {
    return (
      <div className="container">
        <p className="App-intro">
        Chat Bot
        </p>
        <ChatArea  />
      </div>
    );
  }
}

export default App;
