import React, { Component } from "react";

import { mapReverse } from "../../../common/tools";

class MessengersQuickUsersListForm extends Component {
  constructor(props) {
    super(props);
    const { selectedChannelId } = this.props;
    this.state = {
      selectedChannelId
    };
  }
  onChangeSelect = event => {
    const { filterSelectedUsersHandler } = this.props;
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
    filterSelectedUsersHandler(event.currentTarget.value);
  };
  render() {
    const { selectedUsers, selectedChannelId } = this.props;

    // console.log('selectedUsers',selectedUsers);

    const selectedUsersReverse = mapReverse(selectedUsers, function(i) {
      return i;
    });
    const label = selectedChannelId ? (
      <label htmlFor="">Wybrany kanał:</label>
    ) : (
      <label className="alert-text" htmlFor="">
        Wybierz kanał !!!
      </label>
    );

    return (
      <div className="messenger-users-form-box">
        <form action="">
          <div className="form-group">
            {label}
            <select
              className="form-control"
              onChange={this.onChangeSelect}
              name="selectedChannelId"
              value={selectedChannelId}
              required
            >
              <option value="">Wybierz kanał rozmowy</option>
              {selectedUsersReverse
                ? selectedUsersReverse.map(user => {
                    return (
                      <option
                        key={user._id}
                        value={user._id}
                        defaultValue={
                          user._id === selectedChannelId ? "selected" : null
                        }
                      >
                        {user.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
        </form>
      </div>
    );
  }
}
export default MessengersQuickUsersListForm;
