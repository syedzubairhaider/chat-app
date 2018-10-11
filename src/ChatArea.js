import React from "react";
import Message from "./Message";
import Request from "superagent";
import styled from "styled-components";
import { Formik } from "formik";

const Messages = styled.ul`
  background-color: white;
  color: #000;
  height: 250px;
  padding: 20px;
  color: white;
  border: 1px solid #007fff;
  overflow-y: auto;
`;

const Button = styled.button`
  height: 45px;
  width: 20%;
  float: right;
`;
const Input = styled.input`
  width: 75%;
  height: 40px;
`;

class ChatArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      msg: ""
    };
  }

  componentDidMount() {
    let session = localStorage.getItem("session");
    if (!session) {
      session = Math.floor(Math.random() * 1000 + 1);
      localStorage.setItem("session", session);
    }
    this.setState({ session });
    const socket = io();
    socket.on(`chat ${window.location.href.split("/").pop()}`, (obj, user) => {
      this.setState({
        msg: '',
        messages: this.state.messages.concat({ id: obj.id, user, msg: obj.title })
      });
    });
  }

  addMessage(event) {
    event.preventDefault();
    const title = this.state.msg;

    if (title) {
      const uri = window.location.href.split("/").pop();
      Request.post("/api/todos")
        .set("Content-Type", "application/json")
        .send({ title, session: this.state.session, uri })
        .end((error, response) => {
          console.log('error, response: ', error, response)
        });
    }
  }

  render() {
    const displayMessages = this.state.messages
    return (
      <div>
        <Messages>
          {displayMessages.map(message => {
            return <Message message={message} key={message.id} />;
          })}
        </Messages>

        <Formik
          validate={values => {
            let errors = {};
            // REGEX
            console.log("values", values);
            // return errors;
          }}
          render={() => (
            <form onSubmit={e => this.addMessage(e)}>
              <Input
                value={this.state.msg}
                onChange={e => this.setState({ msg: e.target.value })}
                className="input button"
                type="text"
                required
              />
              <Button type="submit">Send Message</Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default ChatArea;
