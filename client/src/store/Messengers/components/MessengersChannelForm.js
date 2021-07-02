import React, { Component } from "react";
import { connect } from "react-redux";

import { StyledMessengersChannelForm } from "../styles/StyledMessengersChannelForm";

class MessengersChannelForm extends Component {
  render() {
    const {
      users,
      selectedChannelId,
      filterSelectedUsersHandler,
      filteredUsers,
    } = this.props;
    console.log("filteredUsers",filteredUsers);
    const channelContainer =
      users.length > 0
        ? users.map((user) => {
            let selectedUser = filteredUsers.filter(
              (item) => item._id === user._id
            );
            return (
              <div className="form-check" key={user._id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={user.name}
                  onChange={() =>
                    filterSelectedUsersHandler(selectedChannelId, {
                      data: user,
                      checked: selectedUser.length > 0 ? false : true,
                    })
                  }
                  checked={selectedUser.length > 0 ? "checked" : ""}
                />
                <label className="form-check-label" htmlFor={user.name}>
                  {user.name}
                </label>
              </div>
            );
          })
        : "Loading ...";
    return (
      <StyledMessengersChannelForm className="channel-form-box">
        {selectedChannelId === "-5" ? (
          <form action="" className="channel-form">
            {channelContainer}
          </form>
        ) : null}
      </StyledMessengersChannelForm>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};
export default connect(mapStateToProps)(MessengersChannelForm);
