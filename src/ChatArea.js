import React from 'react';
import Message from './Message'
import Request from 'superagent';

class ChatArea extends React.Component {
    constructor(props) {
        super();
        this.state = {
            messages: []
        }
    }

 componentWillMount() {
      let self = this
      let session = Math.floor((Math.random() * 1000) + 1);
      self.setState({session:session})
      var socket = io()
      socket.on(`chat ${window.location.href.split('/').pop()}`, (msg,user) => {
            if (user==session) {return 0}
            let id = Math.floor((Math.random() * 1000) + 1);
            self.setState({
                messages: self.state.messages.concat({ id, user, msg }),
            });
      });
}
    componentDidUpdate(){
      let msg =this.refs.msg.value;
      let element = this.refs.messages;
      element.scrollTop = element.scrollHeight;
      if (msg) {
        var url1 = location.protocol + '//' + location.host;
        var express = `${url1}/msg/?msg=${msg}&session=${this.state.session}&uri=${window.location.href.split('/').pop()}`;
        console.log('q : ',express);

  Request.post("/api/todos")
  .set('Content-Type', 'application/json')
  .send({title: msg})
  .end(function(error, response) {
    if (error){
    console.log('todo',error,response)

      return false
    } else {
    console.log('todo ', response.text)

      return true
    }
  });

        fetch(express)
          .then((response) => response.json())
          .then((responseJson) => {
          })
          .catch((error) => {
            console.log(error);
        });
      }
      this.refs.msg.value = '';
    }

    addMessage(event) {
        event.preventDefault();
        let msg = this.refs.msg.value;
        let user = this.state.session;
        let id = Math.floor((Math.random() * 1000) + 1);
        this.setState({
            messages: this.state.messages.concat({ id, user, msg })
        });
    }
    render() {
      let displayMessages = this.state.messages;
      return (
        < div className="flex-outer" >
          < ul className="messages flex-outer" ref="messages" > {
              displayMessages.map((message) => {
                return <Message message={ message } key={ message.id } />
              })
            }
          < /ul>
          < form onSubmit={ this.addMessage.bind(this) } >
          < input className="input button" type="text" ref="msg" required / >
          < button className="button btn" type="submit" > send message < /button>
          < /form>
        < /div>
      );
    }
}

export default ChatArea;
