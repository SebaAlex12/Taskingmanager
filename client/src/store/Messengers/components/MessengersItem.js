import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

class MessengersItem extends Component {
  render() {
    const {
      item: { from, msg, topic, createAt },
      loggedUser
    } = this.props;

    const itemContent =
      loggedUser.name === from ? (
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
      ) : (
        <div className="outgoing_msg">
          <div className="sent_msg">
            <p>{msg}</p>
            <span className="time_date">
              {from} | {moment(new Date(createAt)).format("D/M/Y HH:mm:ss")}
            </span>{" "}
          </div>
          <div className="outgoing_msg_img">
            <img src="avatar.png" alt="" />
          </div>
        </div>
      );

    return <div className="messengers-item-box">{itemContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {})(MessengersItem);
