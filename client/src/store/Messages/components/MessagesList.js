import React, { Component } from "react";
import { connect } from "react-redux";

import { StyledMessagesList } from "../styles/StyledMessagesList";
import { updateMessages } from "../actions";

class MessagesList extends Component {
  componentDidUpdate() {
    console.log("messages update");
    this.reloadInfo();
  }
  reloadInfo() {
    var messagesBox = document.getElementById("messages");
    messagesBox.classList.add("active");
    setTimeout(function() {
      messagesBox.classList.remove("active");
    }, 10500);
  }
  render() {
    const {
      messages: { errors, success }
    } = this.props;
    const errorsContent =
      errors && errors.length > 0
        ? errors.map((error, index) => (
            <div className="msg error" key={index}>
              {/* <div className="title">{error.path}</div> */}
              <div className="description">{error.message}</div>
            </div>
          ))
        : "";
    const successContent =
      success && success.length > 0
        ? success.map((scs, index) => (
            <div className="msg scs" key={index}>
              {/* <div className="title">{scs.path}</div> */}
              <div className="description">{scs.message}</div>
            </div>
          ))
        : "";
    return (
      <StyledMessagesList>
        <div className="messages-box" id="messages">
          {successContent}
          {errorsContent}
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
