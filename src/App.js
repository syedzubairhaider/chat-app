import React, { Component } from 'react';
import './App.css';
import './flexboxgrid/css/flexboxgrid.css';
import './flexboxgrid/css/flexboxgrid.min.css';
import './flexboxgrid/css/index.css';
import './flexboxgrid/dist/flexboxgrid.css';
import './flexboxgrid/dist/flexboxgrid.min.css';
import './flexboxgrid/css/index.min.css';
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
