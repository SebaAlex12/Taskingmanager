import React, { Component } from "react";
import { connect } from "react-redux";

import MessengersUsersItem from "./MessengersUsersItem";
import { StyledMessengerList } from "../styles/StyledMessengerList";

class MessengersUsersList extends Component {
  render() {
    const { filterSelectedUsersHandler } = this.props;
    let { selectedUsers } = this.props;
    let n = 0;

    const usersContent = selectedUsers
      ? selectedUsers
          .map(user => {
            return (
              <MessengersUsersItem
                item={user}
                key={n++}
                filterSelectedUsersHandler={filterSelectedUsersHandler}
              />
            );
          })
          .reverse()
      : null;
    return (
      <StyledMessengerList>
        <div className="inbox_chat">{usersContent}</div>
      </StyledMessengerList>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(MessengersUsersList);
