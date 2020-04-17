import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";

import { SmallerButton } from "../../../themes/basic";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { sortArray } from "../../../common/tools";
import { StyledLastActiveList } from "../styles/StyledLastActiveList";

class UsersLastActiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleListActive: false,
    };
  }
  render() {
    const { users } = this.props;
    const { toggleListActive } = this.state;
    let sortedUsers;
    let container = "";
    if (users.length > 0) {
      sortedUsers = sortArray(users, "lastActive", -1);
      container = sortedUsers.map((user) => {
        return (
          <li>
            {user.name} -{" "}
            {moment(new Date(user.lastActive)).locale("pl").format("LLLL")}
          </li>
        );
      });
    }
    return (
      <StyledLastActiveList>
        <SmallerButton
          onClick={() =>
            this.setState({
              ...this.state,
              toggleListActive: !toggleListActive,
            })
          }
        >
          <FontAwesomeIcon title="pokaż wszystkich" icon={faAngleDown} />
        </SmallerButton>
        <ul
          className="last-active-list-box"
          style={{ cursor: "help", height: toggleListActive ? "auto" : "50px" }}
          title="lista ostatnio aktywnych użytkowników"
        >
          {container}
        </ul>
      </StyledLastActiveList>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};
export default connect(mapStateToProps)(UsersLastActiveList);
