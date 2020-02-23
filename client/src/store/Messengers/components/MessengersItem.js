import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";

import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MessengersItem extends Component {
  render() {
    const {
      item: { _id, from, msg, to, createdAt },
      loggedUser,
      selectedUsers,
      filterSelectedUsersHandler
    } = this.props;

    const messageFromUser = selectedUsers.filter(user => user.name === from);

    // from.split(",").length > 1
    // ? null
    // :

    // const messageFromUser = selectedUsers.filter(user => user.name === from);
    // console.log("to", to);
    // console.log("messageFromUser", messageFromUser);
    // console.log('from.split(",").length', from.split(","));

    const itemContent =
      loggedUser.name === from ? (
        <div className="incoming_msg">
          <div className="incoming_msg_img">
            <img src="avatar.png" alt="" />
          </div>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p className="header_msg">{msg}</p>
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
            <p className="header_msg">
              {msg}
              <Button
                onClick={() =>
                  filterSelectedUsersHandler(messageFromUser[0]._id)
                }
              >
                <FontAwesomeIcon icon={faAddressCard} />
                <span>Odpowiedz</span>
              </Button>
            </p>

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
