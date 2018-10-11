import React, {Component} from 'react'
import './App.css'
import ChatArea from './ChatArea'
import styled from 'styled-components'

const Title = styled.h1 `
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
`

class App extends Component {
    render() {
        return (
            <div>
                <Title>
                    Chat App
                </Title>
                <ChatArea/>
            </div>
        )
    }
}

export default App
