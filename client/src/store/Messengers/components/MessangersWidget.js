import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchMessengersByName } from "../actions";
import MesengersAddForm from "./MessengersAddForm";
import { StyledMessangersWidget } from "../styles/StyledMessangersWidget";
import { mapReverse } from "../../../common/tools";

class MessangersWidget extends Component {
  componentDidMount() {
    const { fetchMessengersByName, loggedUser } = this.props;
    fetchMessengersByName({ name: loggedUser.name });
  }
  render() {
    const { messengers } = this.props;

    const filteredUsers = localStorage.getItem("filteredUsers")
      ? JSON.parse(localStorage.getItem("filteredUsers"))
      : [];

    const messengersReverse = mapReverse(messengers, function (i) {
      return i;
    });

    const content = messengersReverse
      ? messengersReverse.map((item) => (
          <div className="item">
            <div className="from">{item.from}:</div>
            <div className="msg">{item.msg}</div>
          </div>
        ))
      : "Brak wiadomości";
    return (
      <StyledMessangersWidget className="messangers-widget-box">
        <MesengersAddForm filteredUsers={filteredUsers} />
        <div className="messages">{content}</div>
      </StyledMessangersWidget>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
    messengers: state.messengers.messengers,
  };
};
export default connect(mapStateToProps, { fetchMessengersByName })(
  MessangersWidget
);
