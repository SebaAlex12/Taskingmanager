import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

class MessengersItem extends Component {
  render() {
    const {
      item: { from, msg, to, createdAt },
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
                Od: {from} |{" "}
                {moment(new Date(createdAt)).format("D/M/Y HH:mm:ss")}{" "}
                <div>Do: {to}</div>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="outgoing_msg">
          <div className="sent_msg">
            <p>{msg}</p>
            <span className="time_date">
              Od: {from} |{" "}
              {moment(new Date(createdAt)).format("D/M/Y HH:mm:ss")}
              <div>Do: {to}</div>
            </span>
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
