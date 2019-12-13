import React, { Component } from "react";
import moment from "moment";

class MessangersItem extends Component {
  render() {
    const {
      item: { from, msg, topic, createAt }
    } = this.props;

    return (
      <div className="messangers-item-box">
        <div className="incoming_msg">
          <div className="incoming_msg_img">
            <img src="avatar.png" alt="" />
          </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{msg}</p>
              <span className="time_date">
                {from} | {moment(new Date(createAt)).format("D/M/Y HH:mm:ss")}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="outgoing_msg">
          <div className="sent_msg">
            <p>{msg}</p>
            <span className="time_date">
              {from} | {moment(new Date(createAt)).format("D/M/Y HH:mm:ss")}
            </span>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default MessangersItem;
