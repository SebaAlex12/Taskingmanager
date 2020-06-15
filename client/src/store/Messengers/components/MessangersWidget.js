import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchMessengersByName } from "../actions";
import MesengersAddForm from "./MessengersAddForm";
import MessengersChannelForm from "./MessengersChannelForm";
import { StyledMessangersWidget } from "../styles/StyledMessangersWidget";
import { mapReverse } from "../../../common/tools";

import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SmallerButton } from "../../../themes/basic";

class MessangersWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetFullSizeToggle: false,
    };
  }
  componentDidMount() {
    const { fetchMessengersByName, loggedUser } = this.props;
    fetchMessengersByName({ name: loggedUser.name });
  }
  render() {
    const { messengers } = this.props;
    const { widgetFullSizeToggle } = this.state;

    const selectedChannelId = {};
    const filterSelectedUsersHandler = {};

    const filteredUsers = localStorage.getItem("filteredUsers")
      ? JSON.parse(localStorage.getItem("filteredUsers"))
      : [];

    const messengersReverse = mapReverse(messengers, function (i) {
      return i;
    });

    const fullSizeButton = (
      <SmallerButton
        onClick={() =>
          this.setState({ widgetFullSizeToggle: !widgetFullSizeToggle })
        }
        className="widget-full-size-button"
      >
        <FontAwesomeIcon icon={faExpandAlt} />
      </SmallerButton>
    );

    const content = messengersReverse
      ? messengersReverse.map((item) => (
          <div className="item">
            <div className="from">{item.from}:</div>
            <div className="msg">{item.msg}</div>
          </div>
        ))
      : "Brak wiadomości";
    return (
      <StyledMessangersWidget
        className="messangers-widget-box"
        style={{ height: widgetFullSizeToggle ? "400px" : null }}
      >
        {fullSizeButton}
        <MessengersChannelForm
          selectedChannelId={selectedChannelId}
          filteredUsers={filteredUsers}
          filterSelectedUsersHandler={filterSelectedUsersHandler}
        />
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
