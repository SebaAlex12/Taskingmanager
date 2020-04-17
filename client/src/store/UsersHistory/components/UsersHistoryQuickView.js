import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment/min/moment-with-locales";

import { SmallerButton } from "../../../themes/basic";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { sortArray } from "../../../common/tools";
import { StyledUserHistoryQuickView } from "../styles/StyledUserHistoryQuickView";

class UsersHistoryQuickView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleUserHistory: false,
    };
  }
  render() {
    const { usersHistory } = this.props;
    const { toggleUserHistory } = this.state;

    if (usersHistory.lenght > 0) {
      console.log("users history", usersHistory);
    }
    let sortedUsersHistory;
    let container = "";
    if (usersHistory.length > 0) {
      sortedUsersHistory = sortArray(usersHistory, "createdAt", -1);
      container = sortedUsersHistory.map((userHistory) => {
        return (
          <li>
            <div>
              {moment(new Date(userHistory.createdAt))
                .locale("pl")
                .format("LLLL")}
            </div>
            <div>
              {userHistory.userName} - {userHistory.event}
            </div>
          </li>
        );
      });
    }
    return (
      <StyledUserHistoryQuickView>
        <SmallerButton
          onClick={() =>
            this.setState({
              ...this.state,
              toggleUserHistory: !toggleUserHistory,
            })
          }
        >
          <FontAwesomeIcon title="pokaż wszystkich" icon={faAngleDown} />
        </SmallerButton>
        <ul
          className="users-history-list-box"
          style={{
            cursor: "help",
            height: toggleUserHistory ? "auto" : "50px",
          }}
          title="historia użytkowników"
        >
          {container}
        </ul>
      </StyledUserHistoryQuickView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersHistory: state.usersHistory.usersHistory,
  };
};

export default connect(mapStateToProps)(UsersHistoryQuickView);
