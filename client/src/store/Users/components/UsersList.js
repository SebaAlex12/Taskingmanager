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
      userFilterName: "",
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
  filterItems = items => {
    const { userFilterName } = this.state;
    const filteredItems = items.filter(item => {
      return item.name.toLowerCase().indexOf(userFilterName) !== -1;
    });
    if (document.querySelector(".remove-filter")) {
      if (userFilterName.length > 0) {
        document.querySelector(".remove-filter").classList.add("active");
      } else {
        document.querySelector(".remove-filter").classList.remove("active");
      }
    }
    return filteredItems;
  };
  toggleClassHandler = event => {
    event.preventDefault();
    event.target.classList.toggle("active");
    this.setState({
      userFilterName: ""
    });
  };
  onChangeInput = event => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  render() {
    const {
      loggedUser,
      filters: { responsiblePerson }
    } = this.props;
    const { toggleRegistryForm, toggleUsersList, userFilterName } = this.state;

    let users = this.state.users > 0 ? this.state.users : this.props.users;

    if (users && users.length > 0) {
      users = this.filterItems(users);
    }

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
          {loggedUser.status === "Administrator" ||
          loggedUser.status === "Menedżer" ? (
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
                <i
                  className="remove-filter glyphicon glyphicon-remove"
                  onClick={this.toggleClassHandler}
                ></i>
                <div className="form-group">
                  <input
                    onChange={this.onChangeInput}
                    value={userFilterName}
                    type="text"
                    name="userFilterName"
                    className="form-control"
                    placeholder="filtruj po nazwie"
                    title="filtruj po nazwie"
                  />
                </div>
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
