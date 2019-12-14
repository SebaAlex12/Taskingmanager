import React, { Component } from "react";
import { connect } from "react-redux";

import { StyledMessagesList } from "../styles/StyledMessagesList";
import { removeAlertMessages } from "../actions";

class MessagesAlertList extends Component {
  //   componentDidUpdate() {
  //     console.log("alert messages update");
  //   }
  //   reloadInfo() {
  //     var messagesAlertBox = document.getElementById("messages_alert");
  //     messagesAlertBox.classList.add("active");
  //     setTimeout(function() {
  //       messagesAlertBox.classList.remove("active");
  //     }, 10500);
  //   }
  removeHandler = () => {
    const { removeAlertMessages } = this.props;
    removeAlertMessages();
  };
  render() {
    const { alert_messages } = this.props;
    // console.log("alert msg", alert_messages);
    const alertMessagesContent =
      alert_messages && alert_messages.length > 0
        ? alert_messages.map((message, index) => (
            <div className="msg alert" key={index}>
              <div className="title">{message.type}</div>
              <div className="description">{message.data.from}</div>
            </div>
          ))
        : "";
    const clazz =
      alertMessagesContent.length > 0
        ? "messages-alert-box active"
        : "messages-alert-box";

    return (
      <StyledMessagesList>
        <div className={clazz}>
          <i className="glyphicon glyphicon-leaf">
            <div className="content">
              <button className="btn btn-warning" onClick={this.removeHandler}>
                X
              </button>
              {alertMessagesContent}
            </div>
          </i>
        </div>
      </StyledMessagesList>
    );
  }
}

const mapStateToProps = state => {
  return {
    alert_messages: state.messages.alert_messages
  };
};

export default connect(mapStateToProps, { removeAlertMessages })(
  MessagesAlertList
);
