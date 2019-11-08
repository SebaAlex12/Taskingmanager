import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { StyledUserList } from "../styles/StyledUserList";

import { fetchUsers, removeUser, updateUser } from "../actions";
import RegistryForm from "./RegistryForm";

import { updateFilter } from "../../Filters/actions";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleRegistryForm: false,
      toggleUsersList: false
    };
  }
  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }
  removeUserHandler = id => {
    const { removeUser } = this.props;
    removeUser(id);
  };
  updateUserHandler = data => {
    const { updateUser } = this.props;
    updateUser(data);
  };
  userNameHandler(name) {
    const {
      updateFilter,
      filters: { statuses, priorities, projectName }
    } = this.props;
    console.log(name);
    const response = updateFilter({
      priorities,
      statuses,
      projectName,
      responsiblePerson: name
    });
  }
  render() {
    const { users } = this.props;
    const { toggleRegistryForm, toggleUsersList } = this.state;
    const usersContent = users.map(user => {
      return (
        <div
          className="btn btn-default"
          onClick={() => this.userNameHandler(user.name)}
          key={user._id}
        >
          {user.name}
        </div>
      );
    });
    return (
      <StyledUserList>
        <div className="users-box">
          <div className="flow-box">
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleRegistryForm: !toggleRegistryForm
                })
              }
            >
              Dodaj użytkownika
            </Button>
            {toggleRegistryForm ? <RegistryForm /> : null}
          </div>
          <div className="user-list-flow-box">
            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  toggleUsersList: !toggleUsersList
                })
              }
            >
              Lista użytkowników
            </Button>
            {toggleUsersList ? (
              <div className="users-list">{usersContent}</div>
            ) : null}
          </div>
        </div>
      </StyledUserList>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loggedUser: state.users.logged_user,
    filters: state.filters.filters
  };
};

export default connect(
  mapStateToProps,
  { fetchUsers, removeUser, updateUser, updateFilter }
)(UsersList);
