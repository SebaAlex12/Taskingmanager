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
      _id: "-4",
      name: "[Employee]",
      status: "Kanał pracowników"
    };

    const usersManagerArray = {
      _id: "-3",
      name: "[Manager]",
      status: "Kanał menedżerów"
    };

    const usersAdminArray = {
      _id: "-2",
      name: "[Administrator]",
      status: "Kanał administratorów"
    };

    const usersAdminMenegerEmployeeArray = {
      _id: "-1",
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
      selectedChannelId: Object.prototype.hasOwnProperty.call(
        localStorage,
        "selectedChannelId"
      )
        ? JSON.parse(localStorage.getItem("selectedChannelId"))
        : null
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

  static getDerivedStateFromProps(nextProps, nextState) {
    // console.log("next props", nextProps);
    // console.log("next state", nextState);
    if (nextProps.users.length > 0 && nextState.selectedUsers.length === 4) {
      const { loggedUser, users } = nextProps;
      let selectedUsers = [];

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

      // set filtered users to default empty
      filteredUsers = [];

      if (Object.prototype.hasOwnProperty.call(localStorage, "filteredUsers")) {
        filteredUsers = JSON.parse(localStorage.getItem("filteredUsers"));
      } else {
        localStorage.setItem("filteredUsers", JSON.stringify(filteredUsers));
      }

      return {
        selectedUsers: selectedModifyUsers.concat(
          nextState.selectedUsers,
          selectedUsers
        ),
        filteredUsers
      };
    }
    return false;
  }
  componentDidUpdate = () => {
    // if (this.state.filteredUsers.length === 0 && this.props.users.length > 0) {
    //   const { users, loggedUser } = this.props;
    //   const { selectedUsers } = this.state;
    //   let selectedModifyUsers = [];
    //   let filteredUsers = [];
    //   if (loggedUser.status === "Klient") {
    //     const persons = loggedUser.users.split(",");
    //     selectedModifyUsers = users.filter(user =>
    //       persons.includes(user.name) ? user : null
    //     );
    //     filteredUsers = selectedModifyUsers;
    //   } else {
    //     selectedModifyUsers = users;
    //     filteredUsers = selectedModifyUsers.filter(user =>
    //       user.status !== "Klient" ? user : null
    //     );
    //   }
    // if (JSON.parse.localStorage.getItem("filteredUsers").length > 0) {
    //   filteredUsers = JSON.parse(localStorage.getItem("filteredUsers"));
    // } else {
    //   localStorage.setItem("filteredUsers", JSON.stringify(filteredUsers));
    //   filteredUsers = [];
    // }
    // set all selected users available by the default
    // this.setState({
    //   selectedUsers: selectedModifyUsers.concat(selectedUsers),
    //   filteredUsers
    // });
    // }
  };
  filterSelectedUsersHandler = selectedChannelId => {
    const { selectedUsers } = this.state;
    let filteredUsers = [];
    // console.log("filterSelectedUsersHandler", selectedChannelId);
    if (selectedChannelId === "-1") {
      filteredUsers = selectedUsers.filter(user =>
        user.status === "Administrator" ||
        user.status === "Menedżer" ||
        user.status === "Pracownik"
          ? user
          : null
      );
    } else if (selectedChannelId === "-2") {
      filteredUsers = selectedUsers.filter(user =>
        user.status === "Administrator" ? user : null
      );
    } else if (selectedChannelId === "-3") {
      filteredUsers = selectedUsers.filter(user =>
        user.status === "Menedżer" ? user : null
      );
    } else if (selectedChannelId === "-4") {
      filteredUsers = selectedUsers.filter(user =>
        user.status === "Pracownik" ? user : null
      );
    } else {
      filteredUsers = selectedUsers.filter(user => {
        if (user._id === selectedChannelId) {
          return user;
        } else {
          return null;
        }
      });
    }
    // console.log("filteredUsers", filteredUsers);
    localStorage.setItem("filteredUsers", JSON.stringify(filteredUsers));
    localStorage.setItem(
      "selectedChannelId",
      JSON.stringify(selectedChannelId)
    );

    this.setState({
      filteredUsers,
      selectedChannelId
    });
  };
  render() {
    const { selectedUsers, selectedChannelId, filteredUsers } = this.state;
    // console.log("state", this.state);
    // console.log("render");
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
              <MessengersList
                filteredUsers={filteredUsers}
                selectedUsers={selectedUsers}
                selectedChannelId={selectedChannelId}
                filterSelectedUsersHandler={this.filterSelectedUsersHandler}
              />
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
