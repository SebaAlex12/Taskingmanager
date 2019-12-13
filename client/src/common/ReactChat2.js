import React, { Component } from "react";
import io from "socket.io-client";

import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

// import logo from "avatar.png";

class ReactChat2 extends Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.socket = io("http://localhost:5000").connect();
    // this.socket = io();
    console.log("new message incomming", this.socket.on("chat message"));
    this.socket.on("chat:message", message => {
      this.addMessage(message);
    });
  }

  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
    this.socket.on("chat:message", message => {
      this.addMessage(message);
    });
  }

  handleNewUserMessage = newMessage => {
    // const socket = io("http://localhost:3000");
    // console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    this.socket.emit("chat:message", newMessage);
    this.addMessage(newMessage);
  };

  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    console.log("messages", this.state.messages);
    return (
      <div className="ReactChat2">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar="avatar.png"
          title="Może porozmawiamy :)"
          subtitle="Komunikator nasz dominator"
        />
      </div>
    );
  }
}

export default ReactChat2;
