import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatArea from './ChatArea'


class App extends Component {
    render() {
        return ( < div className = "App1" >
            < div className = "App-header" >
            < /div> < p className = "App-intro" >
            Chat Bot < /p> < ChatArea / >
            < /div>
        );
    }
}

export default App;
