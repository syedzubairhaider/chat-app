import React from 'react';
import Message from './Message'
import Fetch from 'react-fetch'

class ChatArea extends React.Component {
    constructor(props) {
        super();
        this.state = {
            lenght: 1,
            messages: props.messages
        }
    }

    botReply() {
        if (this.state.lenght < this.state.messages.length) {
            let msg;

            fetch('http://localhost:3000/?msg=123')
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    let user = 'bot';
                    let id = Math.floor((Math.random() * 1000) + 1);
                    msg = responseJson.status;
                    this.setState({
                        messages: this.state.messages.concat({ id, user, msg }),
                        lenght: this.state.messages.length + 1
                    });
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        let element = this.refs.messages;
        element.scrollTop = element.scrollHeight;
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.botReply(),
            6000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    addMessage(event) {
        event.preventDefault();


        let msg = this.refs.msg.value;
        let user = 'me';
        let id = Math.floor((Math.random() * 1000) + 1);



        fetch('http://localhost:3000/?msg=' + msg)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                let user = 'bot';
                let id = Math.floor((Math.random() * 1000) + 1);
                user = "You said : " + responseJson.message;
                this.setState({
                    messages: this.state.messages.concat({ id, user, msg }),
                    lenght: this.state.messages.length + 1
                });
            })
            .catch((error) => {
                console.log(error);
            });



        this.refs.msg.value = '';
    }


    render() {
        let displayMessages = this.state.messages;
        return ( < div >
            < ul className = "messages"
            ref = "messages"
            onChange = { this.botReply } > {
                displayMessages.map((message) => {
                    return <Message message = { message }
                    key = { message.id }
                    />
                })
            } < /ul> < form onSubmit = { this.addMessage.bind(this) } >
            < input type = "text"
            ref = "msg"
            required / >
            < button type = "submit" > send message < /button> < /form> < /div>
        );
    }
}

export default ChatArea;
