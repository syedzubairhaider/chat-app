import React from 'react'
import Message from './Message'
import Request from 'superagent'

class ChatArea extends React.Component {
    constructor(props) {
        super()
        this.state = {
            messages: [],
            msg: ''
        }
    }

    componentDidMount() {
        let session = Math.floor((Math.random() * 1000) + 1) // get session from browser
        this.setState({session: session})
        var socket = io()
        socket.on(`chat ${window.location.href.split('/').pop()}`, (msg, user) => {
            if (user == session) {
                return false
            }
            let id = Math.floor((Math.random() * 1000) + 1)
            this.setState({
                messages: this
                    .state
                    .messages
                    .concat({id, user, msg})
            })
        })
    }

    addMessage(event) {
        event.preventDefault()
        let msg = this.state.msg
        let user = this.state.session
        let id = Math.floor((Math.random() * 1000) + 1)
        this.setState({
            msg: '',
            messages: this
                .state
                .messages
                .concat({id, user, msg})
        })

        if (msg) {

            const uri = window.location.href.split('/').pop()

            Request
                .post("/api/todos")
                .set('Content-Type', 'application/json')
                .send({title: msg, session: this.state.session, uri})
                .end((error, response) => {
                    console.log('todo err', error, response)
                })
        }
    }

    render() {
        let displayMessages = this.state.messages
        return ( 
          <div> 
            <ul className = "messages"> 
              {
                displayMessages.map((message) => {
                    return <Message message={message} key={message.id}/>
                })
              } 
            </ul>
            <form onSubmit={ (e) => this.addMessage(e) }>
              <input value={this.state.msg} onChange={(e)=>this.setState({msg:e.target.value})} className="input button" type="text" required /> 
              <button className = "button btn" type = "submit" > Send Message </button>
            </form> 
          </div>
        )
    }
}

export default ChatArea