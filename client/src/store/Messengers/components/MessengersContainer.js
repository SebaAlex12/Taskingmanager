import React, { Component } from "react";
import { connect } from "react-redux";

import MessengersList from "./MessengersList";
import { StyledMessengersContainer } from "../styles/StyledMessengersContainer";
import MessengersUsersList from "./MessengersUsersList";
import { fetchMessengersByName } from "../actions";
import { fetchProjectsByLoggedUserProjects } from "../../Projects/actions";

class MessengersContainer extends Component {
  constructor(props) {
    super(props);

    const usersEmployeeArray = {
      _id: -4,
      name: "[Employee]",
      status: "Kanał pracowników"
    };

    const usersManagerArray = {
      _id: -3,
      name: "[Manager]",
      status: "Kanał menedżerów"
    };

    const usersAdminArray = {
      _id: -2,
      name: "[Administrator]",
      status: "Kanał administratorów"
    };

    const usersAdminMenegerEmployeeArray = {
      _id: -1,
      name: "[Administrator+Manager+Employee]",
      status: "Kanał administratorów, menedżerów i pracowników"
    };

    this.state = {
      selectedUsers: [
        usersEmployeeArray,
        usersManagerArray,
        usersAdminArray,
        usersAdminMenegerEmployeeArray
      ],
      filteredUsers: [],
      selectedChannelId: null
    };
  }
  componentDidMount() {
    const {
      loggedUser,
      fetchMessengersByName,
      fetchProjectsByLoggedUserProjects
    } = this.props;
    fetchMessengersByName({ name: loggedUser.name });
    fetchProjectsByLoggedUserProjects(loggedUser.projects);
  }
  componentDidUpdate = () => {
    if (this.state.filteredUsers.length === 0 && this.props.users.length > 0) {
      const { users, loggedUser } = this.props;
      const { selectedUsers } = this.state;

      let selectedModifyUsers = [];
      let filteredUsers = [];

      if (loggedUser.status === "Klient") {
        const persons = loggedUser.users.split(",");
        selectedModifyUsers = users.filter(user =>
          persons.includes(user.name) ? user : null
        );
        filteredUsers = selectedModifyUsers;
      } else {
        selectedModifyUsers = users;
        filteredUsers = selectedModifyUsers.filter(user =>
          user.status !== "Klient" ? user : null
        );
      }
      // set all selected users available by the default
      this.setState({
        selectedUsers: selectedModifyUsers.concat(selectedUsers),
        filteredUsers
      });
    }
  };
  filterSelectedUsersHandler = name => {
    const { selectedUsers } = this.state;
    let filteredUsers = [];
    let selectedChannelId = null;

    if (name === "[Administrator+Manager+Employee]") {
      selectedChannelId = -1;
      filteredUsers = selectedUsers.filter(user =>
        user.status === "Administrator" ||
        user.status === "Menedżer" ||
        user.status === "Pracownik"
          ? user
          : null
      );
    } else if (name === "[Administrator]") {
      selectedChannelId = -2;
      filteredUsers = selectedUsers.filter(user =>
        user.status === "Administrator" ? user : null
      );
    } else if (name === "[Manager]") {
      selectedChannelId = -3;
      filteredUsers = selectedUsers.filter(user =>
        user.status === "Menedżer" ? user : null
      );
    } else if (name === "[Employee]") {
      selectedChannelId = -4;
      filteredUsers = selectedUsers.filter(user =>
        user.status === "Pracownik" ? user : null
      );
    } else {
      filteredUsers = selectedUsers.filter(user => {
        if (user.name === name) {
          selectedChannelId = user._id;
          return user;
        } else {
          return null;
        }
      });
    }

    this.setState({
      filteredUsers,
      selectedChannelId
    });
  };
  render() {
    const { selectedUsers, selectedChannelId, filteredUsers } = this.state;

    return (
      <StyledMessengersContainer className="messenger-container-box">
        <div className="container">
          <h3 className=" text-center">Wiadomości</h3>
          <div className="messaging">
            <div className="inbox_msg">
              <div className="inbox_people">
                <div className="headind_srch">
                  <div className="recent_heading">
                    <h4>Recent</h4>
                  </div>
                  <div className="srch_bar">
                    <div className="stylish-input-group">
                      <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                      />
                      <span className="input-group-addon">
                        <button type="button">
                          {" "}
                          <i
                            className="fa fa-search"
                            aria-hidden="true"
                          ></i>{" "}
                        </button>
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <MessengersUsersList
                  selectedUsers={selectedUsers}
                  selectedChannelId={selectedChannelId}
                  filterSelectedUsersHandler={this.filterSelectedUsersHandler}
                />
              </div>
              <MessengersList filteredUsers={filteredUsers} />
            </div>
          </div>
        </div>
      </StyledMessengersContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    messengers: state.messengers.messengers,
    users: state.users.users,
    loggedUser: state.users.logged_user
  };
};

export default connect(mapStateToProps, {
  fetchMessengersByName,
  fetchProjectsByLoggedUserProjects
})(MessengersContainer);
