import React, { Component } from "react";
import { connect } from "react-redux";

import MessengersItem from "./MessengersItem";
// import { Button } from "../../../themes/basic";
import MessengersAddForm from "./MessengersAddForm";
import MessengersChannelForm from "./MessengersChannelForm";
import MessengersQuickUsersListForm from "./MessengersQuickUsersListForm";
import { StyledMessengerList } from "../styles/StyledMessengerList";
import { mapReverse } from "../../../common/tools";

class MessengersList extends Component {
  render() {
    const {
      messengers,
      filteredUsers,
      selectedUsers,
      selectedChannelId,
      filterSelectedUsersHandler,
    } = this.props;
    let n = 0;

    const messengersReverse = mapReverse(messengers, function (i) {
      return i;
    });

    const messengersContent = messengersReverse.map((messenger) => {
      // return <div>{messanger.msg}</div>;
      return (
        <MessengersItem
          item={messenger}
          key={n++}
          selectedUsers={selectedUsers}
          filterSelectedUsersHandler={filterSelectedUsersHandler}
        />
      );
    });
    return (
      <StyledMessengerList>
        <div className="mesgs">
          <div className="type_msg">
            <div className="input_msg_write">
              <MessengersQuickUsersListForm
                selectedUsers={selectedUsers}
                selectedChannelId={selectedChannelId}
                filterSelectedUsersHandler={filterSelectedUsersHandler}
              />
              <MessengersChannelForm
                selectedChannelId={selectedChannelId}
                filteredUsers={filteredUsers}
                filterSelectedUsersHandler={filterSelectedUsersHandler}
              />
              <MessengersAddForm filteredUsers={filteredUsers} />
            </div>
          </div>
          <div className="msg_history">
            <div className="messengers-list-box">{messengersContent}</div>
          </div>
        </div>
      </StyledMessengerList>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    messengers: state.messengers.messengers,
  };
};

export default connect(mapStateToProps, {})(MessengersList);
