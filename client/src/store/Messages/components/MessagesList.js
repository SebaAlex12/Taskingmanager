import React, { Component } from "react";
import { connect } from "react-redux";

import { StyledMessagesList } from "../styles/StyledMessagesList";
import { updateMessages } from "../actions";

class MessagesList extends Component {
  componentDidUpdate() {
    this.reloadInfo();
  }
  reloadInfo() {
    var messagesBox = document.getElementById("messages");
    messagesBox.classList.add("active");
    setTimeout(function() {
      messagesBox.classList.remove("active");
    }, 2500);
  }
  render() {
    const { messages } = this.props;
    const messagesContent = messages
      ? messages.map((msg, index) => (
          <div className="msg" key={index}>
            {/* <div className="title">{msg.name}</div> */}
            <div className="description">{msg.value}</div>
          </div>
        ))
      : "";
    return (
      <StyledMessagesList>
        <div className="messages-box" id="messages">
          {messagesContent}
        </div>
      </StyledMessagesList>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages
  };
};

export default connect(mapStateToProps, {
  updateMessages
})(MessagesList);
