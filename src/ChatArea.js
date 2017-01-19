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
        if (msg) {
          fetch('http://localhost:3000/?msg='+msg)
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
        < div >
          < ul className="messages" ref="messages" > {
              displayMessages.map((message) => {
                return <Message message={ message } key={ message.id } />
              })
            }
          < /ul>
          < form onSubmit={ this.addMessage.bind(this) } >
          < input type="text" ref="msg" required / >
          < button type="submit" > send message < /button>
          < /form>
        < /div>
      );
    }
}

export default ChatArea;
