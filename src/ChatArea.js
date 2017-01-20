import React from 'react';
import Message from './Message'

class ChatArea extends React.Component {
    constructor(props) {
        super();
        this.state = {
            messages: []
        }
    }

    componentDidUpdate(){
      let msg =this.refs.msg.value;
      let element = this.refs.messages;
      element.scrollTop = element.scrollHeight;
      if (msg) {
        fetch('http://localhost:3001/?msg='+msg)
          .then((response) => response.json())
          .then((responseJson) => {
            let user = 'bot';
            let id = Math.floor((Math.random() * 1000) + 1);
            msg = "You said : " + responseJson.message;
            this.setState({
                messages: this.state.messages.concat({ id, user, msg }),
            });
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
        let user = 'me';
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
