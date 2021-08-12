import React, { Component } from "react";
import { connect } from "react-redux";

import { StyledMessagesList } from "../styles/StyledMessagesList";
import { removeAlertMessages } from "../actions";

class MessagesAlertList extends Component {
  removeHandler = () => {
    const { removeAlertMessages } = this.props;
    removeAlertMessages();
  };
  render() {
    const { alert_messages } = this.props;

    let chatMessages = [];

    alert_messages.forEach(item => {
      switch (item.type) {
        case "messanger":
          chatMessages.push(item.data);
          break;
        default:
          break;
      }
    });
    // const arr = chatMessages.reduce((total, item) => {
    //   let n = total[item.from] ? total[item.from] : 1;
    //   return (total = {
    //     person: item.from,
    //     counter: n++
    //   });
    // }, []);

    const alertMessagesContent =
      alert_messages && alert_messages.length > 0
        ? alert_messages.map((message, index) => {
            let clazz;
            let priority_clazz;
            switch (message.data.type) {
              case "task_add":
                clazz = "glyphicon glyphicon-education";
                break;
              case "task_change":
                clazz = "glyphicon glyphicon-retweet";
                break;
              case "msg_add":
                clazz = "glyphicon glyphicon-comment";
                break;
              default:
                clazz = "";
            }
            switch (message.data.priority) {
              case "Pali się":
                priority_clazz = " priority";
                break;
              default:
                priority_clazz = "";
            }
            return (
              <div className="msg alert" key={index}>
                <div
                  className={clazz + priority_clazz}
                  title={message.data.topic}
                >
                  {/* <div className="topic"></div> */}
                </div>
                <div className="description">{message.data.from}</div>
              </div>
            );
          })
        : "";
    const clazz =
      alertMessagesContent.length > 0
        ? "messages-alert-box active"
        : "messages-alert-box";

    return (
      <StyledMessagesList>
        <div className={clazz}>
          <i className="glyphicon glyphicon-info-sign">
            <div className="content">
              <button className="btn" onClick={this.removeHandler}>
                <i className="glyphicon glyphicon-trash"></i>
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