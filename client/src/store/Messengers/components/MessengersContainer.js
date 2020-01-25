import React, { Component } from "react";
import { connect } from "react-redux";

import MessengersList from "./MessengersList";
import { StyledMessengersContainer } from "../styles/StyledMessengersContainer";
import MessengersUsersList from "./MessengersUsersList";
import { fetchMessengersByName } from "../actions";

class MessengersContainer extends Component {
  constructor(props) {
    super(props);

    const usersEmployeeArray = {
      _id: "-3",
      name: "[Employee]",
      status: "Kanał pracowników"
    };

    const usersAdminArray = {
      _id: "-2",
      name: "[Administrator]",
      status: "Kanał administratorów"
    };

    const usersAdminEmployeeArray = {
      _id: "-1",
      name: "[Administrator+Employee]",
      status: "Kanał administratorów i pracowników"
    };

    this.state = {
      selectedUsers: [
        usersEmployeeArray,
        usersAdminArray,
        usersAdminEmployeeArray
      ],
      filteredUsers: []
    };
  }
  componentDidMount() {
    const { users, loggedUser, fetchMessengersByName } = this.props;
    const { selectedUsers } = this.state;

    let selectedModifyUsers = [];
    let filteredUsers = [];

    fetchMessengersByName({ name: loggedUser.name });

    if (loggedUser.status === "Klient") {
      const persons = loggedUser.users.split(",");
      selectedModifyUsers = users.filter(user => {
        if (persons.includes(user.name)) {
          return user;
        }
      });
      filteredUsers = selectedModifyUsers;
    } else {
      selectedModifyUsers = users;
      filteredUsers = selectedModifyUsers.filter(user => {
        if (user.status !== "Klient") {
          return user;
        }
      });
    }

    // console.log("selectedModifyUsers", selectedModifyUsers);
    // selectedModifyUsers.push(selectedUsers);

    // set all selected users available by the default
    this.setState({
      selectedUsers: selectedModifyUsers.concat(selectedUsers),
      filteredUsers
    });
  }
  filterSelectedUsersHandler = name => {
    const { selectedUsers } = this.state;
    let filteredUsers = [];

    if (name === "[Administrator+Employee]") {
      filteredUsers = selectedUsers.filter(user => {
        if (user.status === "Administrator" || user.status === "Pracownik") {
          return user;
        }
      });
    } else if (name === "[Administrator]") {
      filteredUsers = selectedUsers.filter(user => {
        if (user.status === "Administrator") {
          return user;
        }
      });
    } else if (name === "[Employee]") {
      filteredUsers = selectedUsers.filter(user => {
        if (user.status === "Pracownik") {
          return user;
        }
      });
    } else {
      filteredUsers = selectedUsers.filter(user => {
        if (user.name === name) {
          return user;
        }
      });
    }

    this.setState({
      filteredUsers
    });
  };
  render() {
    const { selectedUsers, filteredUsers, users } = this.state;

    // if (users) {
    //   console.log("state users", users);
    // } else {
    //   console.log("there are no users in state");
    // }

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

export default connect(mapStateToProps, { fetchMessengersByName })(
  MessengersContainer
);
