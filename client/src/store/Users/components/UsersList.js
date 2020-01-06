import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "../../../themes/basic";
import { StyledUserList } from "../styles/StyledUserList";

import { fetchUsers, removeUser, updateUser } from "../actions";
import RegistryForm from "./RegistryForm";

import { updateFilter } from "../../Filters/actions";
import UsersItem from "./UsersItem";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleRegistryForm: false,
      toggleUsersList: false
    };
  }
  removeUserHandler = id => {
    const { removeUser } = this.props;
    removeUser(id);
  };
  updateUserHandler = data => {
    const { updateUser } = this.props;
    updateUser(data);
  };
  removeProjectFilterResponsiblePersonHandler = () => {
    const {
      updateFilter,
      filters: { statuses, priorities, projectName }
    } = this.props;
    updateFilter({ statuses, priorities, projectName, responsiblePerson: "" });
  };
  render() {
    const {
      users,
      loggedUser,
      filters: { responsiblePerson }
    } = this.props;
    const { toggleRegistryForm, toggleUsersList } = this.state;
    const usersContent = users.map(user => {
      return <UsersItem item={user} key={user._id} />;
    });
    const windowHeight = window.innerHeight - 50;
    const clazz =
      responsiblePerson !== ""
        ? "glyphicon glyphicon-filter active"
        : "glyphicon glyphicon-filter";

    const btn_clazz = toggleRegistryForm ? "flow-box active" : "flow-box";
    const btn_list_clazz = toggleUsersList
      ? "user-list-flow-box active"
      : "user-list-flow-box";

    return (
      <StyledUserList>
        <div className="users-box">
          {loggedUser.status === "Administrator" ? (
            <div className={btn_clazz}>
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
          ) : null}
          <div className={btn_list_clazz}>
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
            <i
              className={clazz}
              onClick={
                responsiblePerson !== ""
                  ? this.removeProjectFilterResponsiblePersonHandler
                  : null
              }
            ></i>
            {toggleUsersList ? (
              <div
                className="users-list"
                style={{ height: `${windowHeight}px` }}
              >
                {usersContent}
              </div>
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

export default connect(mapStateToProps, {
  fetchUsers,
  removeUser,
  updateUser,
  updateFilter
})(UsersList);
